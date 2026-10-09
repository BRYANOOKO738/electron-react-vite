import { useAppInfo } from '../hooks/useAppInfo';
import LinkCard from './LinkCard';
import Logo from './Logo';

const LINKS = [
  {
    title: 'Documentation',
    description: 'Guides for building, securing and shipping your app.',
    href: 'https://bryanooko738.github.io/electron-react-vite/',
  },
  {
    title: 'Electron',
    description: 'APIs for windows, menus, files and native features.',
    href: 'https://www.electronjs.org/docs/latest',
  },
  {
    title: 'React',
    description: 'Learn components, state and hooks.',
    href: 'https://react.dev/learn',
  },
  {
    title: 'Tailwind CSS',
    description: 'Style anything with utility classes.',
    href: 'https://tailwindcss.com/docs',
  },
];

// Start an element's entrance animation after `ms` milliseconds (used with animate-fade-up).
const delay = (ms) => ({ animationDelay: `${ms}ms` });

// Slowly drifting colour glows behind the content.
function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] animate-aurora rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/20" />
      <div
        className="absolute -right-32 -bottom-40 h-[30rem] w-[30rem] animate-aurora rounded-full bg-indigo-400/25 blur-3xl dark:bg-indigo-500/20"
        style={{ animationDelay: '-9s' }}
      />
      {/* Fine dotted grid that fades out towards the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(148_163_184/0.25)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-[size:22px_22px]" />
    </div>
  );
}

// The first screen of the app. Replace it with your own UI.
export default function Welcome() {
  // Set in src/preload/preload.js; empty only if the page runs outside Electron.
  const versions = window.electronApp?.versions ?? {};
  // A round trip to the main process through the preload bridge (IPC).
  const appInfo = useAppInfo();

  return (
    <div className="relative min-h-full overflow-hidden">
      <Background />

      <main className="relative mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center gap-8 px-6 py-6 text-center">
        <Logo size={96} />

        <header className="space-y-4">
          <p
            style={delay(200)}
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-sky-700 dark:text-sky-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500" />
            {appInfo ? `${appInfo.name} v${appInfo.version}` : 'Electron React Vite'}
          </p>
          <h1
            style={delay(350)}
            className="animate-fade-up text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Your desktop app is{' '}
            <span className="animate-shine bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 bg-[length:200%_auto] bg-clip-text text-transparent">
              ready.
            </span>
          </h1>
          <p
            style={delay(500)}
            className="animate-fade-up mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400"
          >
            Edit{' '}
            <code className="rounded-md bg-slate-900/5 px-1.5 py-0.5 text-base dark:bg-white/10">
              src/renderer/App.jsx
            </code>{' '}
            and save. The window updates instantly.
          </p>
        </header>

        <section
          aria-label="Runtime versions"
          style={delay(650)}
          className="animate-fade-up flex flex-wrap justify-center gap-2"
        >
          {[
            ['Electron', versions.electron],
            ['Chromium', versions.chrome],
            ['Node.js', versions.node],
          ].map(([name, version]) => (
            <span
              key={name}
              className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
            >
              <span className="text-slate-500 dark:text-slate-400">{name}</span>{' '}
              <span className="font-mono font-medium">{version ?? '—'}</span>
            </span>
          ))}
        </section>

        <nav aria-label="Learn more" className="grid w-full gap-3 sm:grid-cols-2">
          {LINKS.map((link, index) => (
            <LinkCard key={link.href} {...link} delayMs={800 + index * 100} />
          ))}
        </nav>
      </main>
    </div>
  );
}
