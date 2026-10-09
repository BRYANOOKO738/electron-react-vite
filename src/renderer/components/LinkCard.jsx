// A card that links to an external page. target="_blank" links open in the
// user's browser (see lockDownNavigation in src/main/security.js).
export default function LinkCard({ title, description, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group rounded-xl border border-slate-200 p-4 transition hover:border-sky-500 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-sky-500 dark:border-slate-800 dark:hover:bg-sky-950/40"
    >
      <h2 className="font-semibold">
        {title}{' '}
        <span aria-hidden="true" className="inline-block transition group-hover:translate-x-0.5">
          →
        </span>
      </h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </a>
  );
}
