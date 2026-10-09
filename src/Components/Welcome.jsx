import { useEffect, useState } from 'react';

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
  // Set in src/preload.js; undefined only if the page runs outside Electron.
  const versions = window.electronApp?.versions ?? {};
  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    // A round trip to the main process through the preload bridge (IPC).
    window.electronApp
      ?.getAppInfo()
      .then(setAppInfo)
      .catch((error) => console.error('Could not load app info:', error));
  }, []);

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
            src/Components/Welcome.jsx
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
          // target="_blank" links open in the user's browser (see setWindowOpenHandler in main.js).
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-slate-200 p-4 transition hover:border-sky-500 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-sky-500 dark:border-slate-800 dark:hover:bg-sky-950/40"
          >
            <h2 className="font-semibold">
              {link.title}{' '}
              <span
                aria-hidden="true"
                className="inline-block transition group-hover:translate-x-0.5"
              >
                →
              </span>
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{link.description}</p>
          </a>
        ))}
      </nav>
    </main>
  );
}
