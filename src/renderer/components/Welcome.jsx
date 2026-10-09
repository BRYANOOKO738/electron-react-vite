import { useAppInfo } from '../hooks/useAppInfo';
import LinkCard from './LinkCard';

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

// The first screen of the app. Replace it with your own UI.
export default function Welcome() {
  // Set in src/preload/preload.js; empty only if the page runs outside Electron.
  const versions = window.electronApp?.versions ?? {};
  // A round trip to the main process through the preload bridge (IPC).
  const appInfo = useAppInfo();

  return (
    <main className="mx-auto flex min-h-full max-w-3xl flex-col justify-center gap-10 px-6 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold tracking-wide text-sky-600 uppercase dark:text-sky-400">
          {appInfo ? `${appInfo.name} v${appInfo.version}` : 'Electron React Vite'}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Your desktop app is ready.
        </h1>
        <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Edit{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-base dark:bg-slate-800">
            src/renderer/App.jsx
          </code>{' '}
          and save. The window updates instantly.
        </p>
      </header>

      <section aria-label="Runtime versions" className="grid grid-cols-3 gap-3">
        {[
          ['Electron', versions.electron],
          ['Chromium', versions.chrome],
          ['Node.js', versions.node],
        ].map(([name, version]) => (
          <div
            key={name}
            className="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">{name}</p>
            <p className="mt-1 font-mono text-sm font-medium">{version ?? '—'}</p>
          </div>
        ))}
      </section>

      <nav aria-label="Learn more" className="grid gap-3 sm:grid-cols-2">
        {LINKS.map((link) => (
          <LinkCard key={link.href} {...link} />
        ))}
      </nav>
    </main>
  );
}
