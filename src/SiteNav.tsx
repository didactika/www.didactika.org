import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandMark } from './Brand';
import { LanguageMenu, ThemeToggle } from './Controls';
import { GithubMark } from './Footer';
import { LANG_PATHS, dictionaries } from './i18n';
import type { Lang } from './i18n';

const DOCS_URL = 'https://docs.didactika.org/';
const GITHUB_URL = 'https://github.com/didactika';

// The navigation bar of didactika.org. It is the same on every page (the home and the resources): same height, same width, same links in
// the same order, so a visitor never sees it change when moving between pages. Its links are addresses, not scripts, which is why they
// work from any page; on the home the browser scrolls to the section.
export default function SiteNav({ lang, path = '' }: { lang: Lang; path?: string }) {
  const t = dictionaries[lang].nav;
  const [open, setOpen] = useState(false);
  const home = LANG_PATHS[lang];
  const links = [
    { label: t.projects, href: `${home}#proyectos` },
    { label: t.resources, href: `${home}resources/` },
    { label: t.docs, href: DOCS_URL },
    { label: t.about, href: `${home}#about` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <nav aria-label={t.label} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <a href={home} className="flex items-center gap-3" aria-label="Didactika.org">
            <BrandMark />
            <span className="text-2xl font-bold tracking-tighter text-slate-900 max-[460px]:hidden">
              Didactika<span className="font-light text-teal-600">.org</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-700">
                {link.label}
              </a>
            ))}
            <span className="mx-2 h-5 w-px bg-slate-200" aria-hidden="true" />
            <LanguageMenu lang={lang} label={t.language} filterLabel={t.languageFilter} path={path} />
            <ThemeToggle label={t.theme} />
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-teal-400 hover:text-teal-700">
              <GithubMark className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageMenu lang={lang} label={t.language} filterLabel={t.languageFilter} path={path} />
            <ThemeToggle label={t.theme} />
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t.menu} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="grid gap-1 border-t border-slate-100 pb-4 pt-2 md:hidden">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg p-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-700">
                {link.label}
              </a>
            ))}
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white">
              <GithubMark className="h-5 w-5" /> GitHub
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
