import { Check, ChevronDown, Languages, Moon, Search, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LANGS, LANG_NAMES, LANG_PATHS, rememberLang } from './i18n';
import type { Lang } from './i18n';

const THEME_KEY = 'didactika-theme';

/** The theme the reader asked for, or the one of the system. */
const currentTheme = (): 'light' | 'dark' => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

/** The button that swaps the colour theme. The theme is set before the first paint by the script of each page (see index.html). */
export function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => setTheme(currentTheme()), []);

  const toggle = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* the page works without storage */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-teal-400 hover:text-teal-700"
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

/**
 * The language of the reader. It is a menu with a filter and not a row of links, because the languages are data (src/i18n) and the list
 * will grow: it scrolls, and it can be filtered by name or code once there are more than six.
 * `path` is the page without the language, so each entry opens the same page in its language.
 */
export function LanguageMenu({ lang, label, filterLabel, path = '' }: { lang: Lang; label: string; filterLabel: string; path?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const filterable = LANGS.length > 6;

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === 'Escape' : !box.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const shown = LANGS.filter((code) => `${LANG_NAMES[code]} ${code}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        title={label}
        className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 transition-colors hover:border-teal-400"
      >
        <Languages className="h-4 w-4 text-teal-600" aria-hidden="true" />
        <span className="font-mono text-xs uppercase">{lang}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          {filterable && (
            <label className="mb-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-teal-500">
              <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={filterLabel}
                aria-label={filterLabel}
                className="h-9 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none"
              />
            </label>
          )}
          <ul role="listbox" aria-label={label} className="max-h-72 overflow-y-auto">
            {shown.map((code) => (
              <li key={code} role="option" aria-selected={code === lang}>
                <a
                  href={`${LANG_PATHS[code]}${path}`}
                  hrefLang={code}
                  lang={code}
                  onClick={() => rememberLang(code)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-slate-100 ${code === lang ? 'bg-teal-50 font-bold text-teal-700' : 'text-slate-800'}`}
                >
                  <span className="inline-flex h-6 min-w-8 items-center justify-center rounded-md bg-slate-100 font-mono text-[11px] font-semibold uppercase text-slate-500">{code}</span>
                  <span className="flex-1">{LANG_NAMES[code]}</span>
                  {code === lang && <Check className="h-4 w-4" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
