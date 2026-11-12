import { Logo } from './App';

/**
 * The mark of Didactika, the same as the one of the documentation and of the design system: the book on a white tile.
 * `tag` is the small pill the documentation adds ("DOC"); the site of the organisation has none.
 */
export function BrandMark({ size = 'md', tag }: { size?: 'sm' | 'md' | 'lg'; tag?: string }) {
  const box = size === 'lg' ? 'h-12 w-12 rounded-[13px]' : size === 'sm' ? 'h-9 w-9 rounded-[10px]' : 'h-10 w-10 rounded-[11px]';
  return (
    <span className={`relative flex shrink-0 items-center justify-center bg-white shadow-[0_0_0_1px_var(--color-slate-200),0_2px_8px_rgb(0_85_90/18%)] ${box}`} aria-hidden="true">
      <Logo className="h-[74%] w-[74%]" fill="var(--logo-ink)" />
      {tag && <b className="absolute -bottom-1.5 -right-2 rounded-md bg-teal-700 px-1.5 py-[3px] font-display text-[8px] font-bold leading-none tracking-wide text-white ring-2 ring-white">{tag}</b>}
    </span>
  );
}
