import { ArrowLeft, BookOpen, Code, ExternalLink, Heart, Package, Palette, Plug } from 'lucide-react';
import type { ComponentType } from 'react';
import { Logo } from './App';
import Footer from './Footer';
import resources from './data/resources.json';
import { LANGS, LANG_PATHS, rememberLang } from './i18n';
import type { Lang } from './i18n';

type Localised = Record<Lang, string>;

interface Item {
  name: Localised;
  summary: Localised;
  url: string;
  host: string;
  icon: string;
}

interface Group {
  id: string;
  title: Localised;
  description: Localised;
  items: Item[];
}

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  book: BookOpen,
  palette: Palette,
  plug: Plug,
  package: Package,
  code: Code,
  heart: Heart,
};

const TEXT: Record<Lang, { title: string; intro: string; back: string; open: string; language: string }> = {
  es: {
    title: 'Recursos de Didactika',
    intro:
      'Todos los sitios, repositorios y servicios de Didactika en un único lugar: documentación, sistema de diseño, plugins de Moodle, paquetes npm y código abierto.',
    back: 'Volver al inicio',
    open: 'Abrir',
    language: 'Idioma',
  },
  en: {
    title: 'Didactika resources',
    intro:
      'Every site, repository and service of Didactika in one place: documentation, design system, Moodle plugins, npm packages and open source code.',
    back: 'Back to home',
    open: 'Open',
    language: 'Language',
  },
};

// The page of the resources of Didactika: a list, by kind, of everything the organisation publishes and where it lives.
export default function Resources({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const groups = resources as Group[];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-600 selection:bg-teal-100 selection:text-teal-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <a href={LANG_PATHS[lang]} className="flex items-center gap-3 group" aria-label={t.back}>
            <span className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm group-hover:border-teal-400 transition-all">
              <Logo className="h-8 w-8" fill="#00555a" />
            </span>
            <span className="font-bold text-2xl tracking-tighter text-slate-900">
              Didactika<span className="text-teal-600 font-light">.org</span>
            </span>
          </a>
          <div role="group" aria-label={t.language} className="flex items-center gap-1.5 text-xs font-bold">
            {LANGS.map((code, index) => (
              <span key={code} className="flex items-center gap-1.5">
                {index > 0 && <span aria-hidden="true" className="text-slate-300">·</span>}
                <a
                  href={`${LANG_PATHS[code]}resources/`}
                  hrefLang={code}
                  lang={code}
                  aria-current={code === lang ? 'page' : undefined}
                  onClick={() => rememberLang(code)}
                  className={`py-1 uppercase transition-colors ${code === lang ? 'text-teal-700' : 'text-slate-500 hover:text-teal-700'}`}
                >
                  {code}
                </a>
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <a href={LANG_PATHS[lang]} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t.back}
        </a>
        <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">{t.intro}</p>

        <div className="mt-14 space-y-14">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <h2 id={`group-${group.id}`} className="text-2xl font-bold tracking-tight text-slate-900">
                {group.title[lang]}
              </h2>
              <p className="mt-1 text-slate-500">{group.description[lang]}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {group.items.map((item) => {
                  const Icon = ICONS[item.icon] ?? Code;
                  return (
                    <li key={item.url}>
                      <a
                        href={item.url}
                        className="group flex h-full gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-lg"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900">{item.name[lang]}</span>
                            <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-teal-600" aria-label={t.open} />
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-slate-500">{item.summary[lang]}</span>
                          <span className="mt-2 block font-mono text-xs text-teal-700">{item.host}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
