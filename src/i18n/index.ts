import { es } from './es';
import { en } from './en';
import type { Dictionary } from './es';

export type Lang = 'es' | 'en';
export type { Dictionary };

export const LANGS: Lang[] = ['es', 'en'];
export const DEFAULT_LANG: Lang = 'es';

export const dictionaries: Record<Lang, Dictionary> = { es, en };

// Cada idioma tiene su propio HTML de entrada (index.html y en/index.html)
export const LANG_PATHS: Record<Lang, string> = { es: '/', en: '/en/' };

// El idioma de la página lo fija el atributo lang del <html> de cada entrada
export const getPageLang = (): Lang =>
  LANGS.find((l) => l === document.documentElement.lang) ?? DEFAULT_LANG;

// Guarda la elección del usuario. vercel.json la lee para no aplicar la
// redirección automática por Accept-Language una vez que el usuario eligió.
export const rememberLang = (lang: Lang) => {
  document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
};
