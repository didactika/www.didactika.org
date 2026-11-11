import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// Una entrada HTML por idioma y por página: el idioma por defecto vive en la raíz (/ y /resources/) y cada uno de los demás en su carpeta
// (/en/, /en/resources/). Una carpeta de dos letras con un index.html es un idioma, así que añadir uno no obliga a tocar esta lista
// (ver tools/add-language.mjs).
const pages = ['index.html', 'resources/index.html']
for (const folder of readdirSync(here('.'), { withFileTypes: true })) {
  if (folder.isDirectory() && /^[a-z]{2}$/.test(folder.name)) {
    for (const page of pages) {
      if (existsSync(here(`./${folder.name}/${page}`))) pages.push(`${folder.name}/${page}`)
    }
  }
}
const input = Object.fromEntries(
  [...new Set(pages)].filter((page) => existsSync(here(`./${page}`))).map((page) => [page.replace(/\/?index\.html$/, '').replaceAll('/', '-') || 'main', here(`./${page}`)]),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { rollupOptions: { input } },
})
