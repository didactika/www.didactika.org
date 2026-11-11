import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Una entrada HTML por idioma: / (español) y /en/ (inglés)
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
        resources: fileURLToPath(new URL('./resources/index.html', import.meta.url)),
        resourcesEn: fileURLToPath(new URL('./en/resources/index.html', import.meta.url)),
      },
    },
  },
})
