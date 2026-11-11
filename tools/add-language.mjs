// Adds a language to didactika.org.
//
//   node tools/add-language.mjs <code> "<name in that language>"
//   node tools/add-language.mjs fr "Français"
//
// It copies the English texts as a starting point (translate src/i18n/<code>.ts afterwards), registers the language, creates its two pages
// (/<code>/ and /<code>/resources/), lists them in the sitemap and in the alternates of every page, and makes the visitors whose browser
// asks for that language land on it. The build finds the new pages by itself.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const [code, name] = process.argv.slice(2);
if (!code || !name || !/^[a-z]{2}$/.test(code)) {
  throw new Error('usage: node tools/add-language.mjs <two-letter code> "<name>"');
}
const read = (file) => readFileSync(join(root, file), 'utf8');
const write = (file, text) => {
  mkdirSync(dirname(join(root, file)), { recursive: true });
  writeFileSync(join(root, file), text);
};

if (existsSync(join(root, 'src/i18n', `${code}.ts`))) {
  throw new Error(`${code} already exists`);
}

// 1. The texts.
write(`src/i18n/${code}.ts`, read('src/i18n/en.ts').replace('export const en: Dictionary', `export const ${code}: Dictionary`).replace('en. Debe tener', `${name}. Debe tener`));

// 2. The registry.
let index = read('src/i18n/index.ts');
index = index
  .replace("import { en } from './en';", `import { en } from './en';\nimport { ${code} } from './${code}';`)
  .replace(/export type Lang = ([^;]+);/, (_, list) => `export type Lang = ${list} | '${code}';`)
  .replace(/export const LANGS: Lang\[\] = \[([^\]]+)\];/, (_, list) => `export const LANGS: Lang[] = [${list}, '${code}'];`)
  .replace(/dictionaries: Record<Lang, Dictionary> = \{ ([^}]+) \};/, (_, list) => `dictionaries: Record<Lang, Dictionary> = { ${list}, ${code} };`)
  .replace(/LANG_NAMES: Record<Lang, string> = \{ ([^}]+) \};/, (_, list) => `LANG_NAMES: Record<Lang, string> = { ${list}, ${code}: '${name}' };`)
  .replace(/LANG_PATHS: Record<Lang, string> = \{ ([^}]+) \};/, (_, list) => `LANG_PATHS: Record<Lang, string> = { ${list}, ${code}: '/${code}/' };`);
write('src/i18n/index.ts', index);

// 3. The two pages, from the English ones.
const page = (file, target) => {
  const text = read(file)
    .replace('<html lang="en">', `<html lang="${code}">`)
    .replace(/href="https:\/\/didactika\.org\/en\/((?:resources\/)?)" \/>\n    <link rel="alternate" hreflang="es"/, `href="https://didactika.org/${code}/$1" />\n    <link rel="alternate" hreflang="es"`);
  write(target, text);
};
page('en/index.html', `${code}/index.html`);
page('en/resources/index.html', `${code}/resources/index.html`);

// 4. The alternates of every page, and the sitemap.
const pages = [];
const walk = (dir) => {
  for (const entry of readdirSync(join(root, dir))) {
    const path = join(dir, entry);
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git' || entry === 'src' || entry === 'public') continue;
    if (statSync(join(root, path)).isDirectory()) walk(path);
    else if (entry === 'index.html') pages.push(path.replaceAll('\\', '/'));
  }
};
walk('.');
for (const file of pages) {
  const resources = file.includes('resources/');
  const alternate = `    <link rel="alternate" hreflang="${code}" href="https://didactika.org/${code}/${resources ? 'resources/' : ''}" />\n`;
  const text = read(file);
  if (!text.includes(`hreflang="${code}"`)) {
    write(file, text.replace(/(    <link rel="alternate" hreflang="x-default")/, alternate + '$1'));
  }
}
let sitemap = read('public/sitemap.xml');
sitemap = sitemap.replace(/(    <xhtml:link rel="alternate" hreflang="x-default" href="https:\/\/didactika\.org\/en\/(resources\/)?" \/>)/g, (match, _all, resources) => `    <xhtml:link rel="alternate" hreflang="${code}" href="https://didactika.org/${code}/${resources ?? ''}" />\n${match}`);
const entry = (path) => `  <url>\n    <loc>https://didactika.org/${code}/${path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${path ? '0.6' : '1.0'}</priority>\n  </url>\n`;
sitemap = sitemap.replace('</urlset>', entry('') + entry('resources/') + '</urlset>');
write('public/sitemap.xml', sitemap);

// 5. The visitors whose browser asks for the language.
const vercel = JSON.parse(read('vercel.json'));
vercel.redirects.unshift({
  source: '/',
  has: [{ type: 'header', key: 'accept-language', value: `^${code}.*` }],
  missing: [{ type: 'cookie', key: 'lang' }],
  destination: `/${code}/`,
  permanent: false,
});
write('vercel.json', JSON.stringify(vercel, null, 2) + '\n');

console.log(`${name} (${code}) added. Translate src/i18n/${code}.ts, then run npm run build.`);
