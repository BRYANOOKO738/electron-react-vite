// A card that links to an external page. target="_blank" links open in the
// user's browser (see lockDownNavigation in src/main/security.js).
export default function LinkCard({ title, description, href, delayMs = 0 }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ animationDelay: `${delayMs}ms` }}
      className="group animate-fade-up rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-left shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10 focus-visible:outline-2 focus-visible:outline-sky-500 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-sky-500"
    >
      <h2 className="flex items-center justify-between font-semibold">
        {title}
        <span
          aria-hidden="true"
          className="text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-sky-500"
        >
          →
        </span>
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </a>
  );
}
