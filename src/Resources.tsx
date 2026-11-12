import { ArrowLeft, BookOpen, Code, ExternalLink, Heart, Package, Palette, Plug } from 'lucide-react';
import type { ComponentType } from 'react';
import SiteNav from './SiteNav';
import Footer from './Footer';
import resources from './data/resources.json';
import { LANG_PATHS, dictionaries } from './i18n';
import type { Lang } from './i18n';

type Localised = Record<Lang, string>;

interface Item {
  name: Localised;
  summary: Localised;
  url: string;
  host: string;
  icon: string;
  badge?: Localised;
  code?: string;
  docs?: Partial<Record<Lang, string>>;
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

// The page of the resources of Didactika: everything the organisation publishes and where it lives, by kind. The list is data
// (src/data/resources.json); a plugin, a package or a site is one entry there.
export default function Resources({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const groups = resources as unknown as Group[];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 selection:bg-teal-100 selection:text-teal-900">
      <SiteNav lang={lang} path="resources/" />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <a href={LANG_PATHS[lang]} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-700">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t.resources.back}
        </a>
        <span className="eyebrow mt-8 block">{t.resources.eyebrow}</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{t.resources.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">{t.resources.intro}</p>

        <nav aria-label={t.resources.title} className="mt-8 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a key={group.id} href={`#group-${group.id}`} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-400 hover:text-teal-700">
              {group.title[lang]} <span className="ml-1 text-slate-400">{group.items.length}</span>
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-14">
          {groups.map((group) => (
            <section key={group.id} id={`group-${group.id}`} aria-labelledby={`title-${group.id}`} className="scroll-mt-28">
              <h2 id={`title-${group.id}`} className="text-2xl font-bold tracking-tight text-slate-900">
                {group.title[lang]}
              </h2>
              <p className="mt-1 text-slate-500">{group.description[lang]}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => {
                  const Icon = ICONS[item.icon] ?? Code;
                  const docs = item.docs?.[lang];
                  return (
                    <li key={item.url} className="relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-500/40 hover:shadow-lg">
                      <a href={item.url} className="flex flex-1 gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900">{item.name[lang]}</span>
                            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-300" aria-label={t.resources.open} />
                          </span>
                          {item.code && <span className="mt-0.5 block break-all font-mono text-xs text-slate-500">{item.code}</span>}
                          <span className="mt-2 block text-sm leading-relaxed text-slate-500">{item.summary[lang]}</span>
                        </span>
                      </a>
                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-xs">
                        {item.badge && <span className="rounded-md border border-teal-100 bg-teal-50 px-2 py-0.5 font-mono font-bold uppercase tracking-wider text-teal-700">{item.badge[lang]}</span>}
                        <span className="font-mono text-slate-500">{item.host}</span>
                        {docs && (
                          <a href={docs} className="ml-auto inline-flex items-center gap-1.5 font-bold text-teal-700 hover:underline">
                            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> {t.resources.docs}
                          </a>
                        )}
                      </div>
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
