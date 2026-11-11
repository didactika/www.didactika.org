import { Heart, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BrandMark } from './Brand';
import photoEduardo from './assets/eduardo-pp.jpg';
import photoHector from './assets/hector-pp.jpg';
import { LANG_PATHS, dictionaries } from './i18n';
import type { Lang } from './i18n';

interface Person {
  login: string;
  url: string;
  avatar: string;
}

const ORG = 'didactika';
const MAX = 8;
const CACHE_KEY = 'didactika-people';
const CACHE_MS = 30 * 60 * 1000;

const FOUNDERS = [
  { login: 'E2RD0', name: 'Eduardo Estrada', photo: photoEduardo },
  { login: 'hector-ae21', name: 'Hector Arrechea', photo: photoHector },
];

const GithubMark = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

// The collaborators, the same on every site of Didactika: the public members of the organisation on GitHub except the co-founders, who are
// shown on their own. They are read when the page opens and kept for half an hour so a visit does not spend the limit GitHub puts on
// anonymous requests. Without them, none are shown.
function useCollaborators(): Person[] {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null') as { at: number; list: Person[] } | null;
        if (cached && Date.now() - cached.at < CACHE_MS) {
          if (alive) setPeople(cached.list);
          return;
        }
      } catch {
        /* no storage: ask every time */
      }
      const response = await fetch(`https://api.github.com/orgs/${ORG}/public_members?per_page=100`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!response.ok) return;
      const raw = (await response.json()) as Array<{ login: string; html_url: string; avatar_url: string }>;
      const list = raw
        .filter((user) => !FOUNDERS.some((founder) => founder.login.toLowerCase() === user.login.toLowerCase()))
        .map((user) => ({ login: user.login, url: user.html_url, avatar: `${user.avatar_url}${user.avatar_url.includes('?') ? '&' : '?'}s=64` }));
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), list }));
      } catch {
        /* optional */
      }
      if (alive) setPeople(list);
    };
    run().catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  return people;
}

// The foot of every page of didactika.org, the same as the one of the documentation and of the design system: what Didactika is, its
// co-founders, its collaborators and how to support it. GitHub is an icon of the header, and of the foot where the header has no room.
export default function Footer({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].footer;
  const people = useCollaborators();
  const shown = people.slice(0, MAX);

  return (
    <footer className="relative z-10 border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <a href={LANG_PATHS[lang]} className="flex max-w-sm items-center gap-3 text-slate-900">
            <BrandMark size="lg" />
            <span>
              <b className="block text-base font-bold">Didactika.org</b>
              <span className="block text-sm leading-snug text-slate-500">{t.about}</span>
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex flex-wrap gap-2">
              {FOUNDERS.map((person) => (
                <li key={person.login}>
                  <a
                    href={`https://github.com/${person.login}`}
                    title={`${person.name} · GitHub`}
                    className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 py-1 pl-1 pr-4 transition-colors hover:border-teal-400 hover:bg-teal-50"
                  >
                    <img src={person.photo} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                    <span>
                      <b className="block text-[13px] font-semibold leading-tight text-slate-900">{person.name}</b>
                      <small className="block text-[11px] text-slate-500">{t.cofounder}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2.5">
              {shown.length > 0 && <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">{t.collaborators}</span>}
              <span className="flex items-center pl-1.5">
                {shown.map((person) => (
                  <a key={person.login} href={person.url} title={person.login} aria-label={person.login} className="-ml-1.5 h-8 w-8 rounded-full ring-2 ring-white transition-transform hover:z-10 hover:-translate-y-0.5">
                    <img src={person.avatar} alt="" width={32} height={32} loading="lazy" className="h-full w-full rounded-full object-cover" />
                  </a>
                ))}
                {people.length > MAX && (
                  <a href={`https://github.com/orgs/${ORG}/people`} title={t.allCollaborators} className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500 ring-2 ring-white">
                    +{people.length - MAX}
                  </a>
                )}
              </span>
              <a
                href={`https://github.com/orgs/${ORG}/repositories`}
                title={t.join}
                aria-label={t.join}
                className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-dashed border-slate-400 text-slate-500 transition-colors hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700"
              >
                <UserPlus className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Didactika · {t.licence}</span>
          <a href="https://ko-fi.com/didactika" rel="noopener" className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-slate-900">
            <Heart className="h-3.5 w-3.5 text-rose-600" aria-hidden="true" /> {t.support}
          </a>
          <a href="https://github.com/didactika" aria-label="GitHub" title="GitHub" className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-teal-400 hover:text-teal-700 md:hidden">
            <GithubMark className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
