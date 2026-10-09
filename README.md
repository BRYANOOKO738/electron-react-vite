<div align="center">

# Electron React Vite

**The beginner-friendly way to build secure desktop apps with the web tools you already know.**

Electron · React · Vite · Tailwind CSS · Electron Forge

[![CI](https://github.com/BRYANOOKO738/electron-react-vite/actions/workflows/ci.yml/badge.svg)](https://github.com/BRYANOOKO738/electron-react-vite/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/BRYANOOKO738/electron-react-vite?include_prereleases)](https://github.com/BRYANOOKO738/electron-react-vite/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[**Documentation**](https://bryanooko738.github.io/electron-react-vite/) ·
[**Download**](https://github.com/BRYANOOKO738/electron-react-vite/releases/latest) ·
[**Report a bug**](https://github.com/BRYANOOKO738/electron-react-vite/issues/new/choose)

</div>

---

## Why this template?

- **Start in one minute.** Clone, install, `npm start`. A working app opens with a welcome screen
  that explains where to go next.
- **Secure by default.** Context isolation, sandboxing, a strict Content Security Policy, a
  navigation guard and Electron fuses are already set up, and tests check them.
- **Learn by example.** The welcome screen shows how the page talks to Electron through a safe
  preload bridge (IPC), with comments explaining each step.
- **Reliable.** Crash recovery, an error screen instead of a blank window, one running copy at a
  time, and end-to-end tests that start the real app.
- **Ready to ship.** One command builds installers for Windows, macOS and Linux. Pushing a version
  tag publishes them to GitHub Releases automatically.
- **Clean code from day one.** ESLint, Prettier and CI on every pull request.

## Quick start

You need [Node.js](https://nodejs.org/) 20 or newer (22 recommended) and [Git](https://git-scm.com/).

```bash
git clone https://github.com/BRYANOOKO738/electron-react-vite.git my-app
cd my-app
npm install
npm start
```

The app opens. Edit `src/Components/Welcome.jsx`, save, and watch the window update.

## Scripts

| Command            | What it does                                        |
| ------------------ | --------------------------------------------------- |
| `npm start`        | Runs the app in development mode with hot reload    |
| `npm test`         | Builds the app and runs the end-to-end tests        |
| `npm run check`    | Runs ESLint and the Prettier format check           |
| `npm run lint:fix` | Fixes lint problems that can be fixed automatically |
| `npm run format`   | Formats every file with Prettier                    |
| `npm run package`  | Bundles the app into `out/` (no installer)          |
| `npm run make`     | Builds installers for your system into `out/make/`  |
| `npm run publish`  | Builds and uploads installers to a GitHub release   |
| `npm run docs:dev` | Runs the documentation site locally                 |

## Project structure

```text
src/
├── Components/
│   ├── ErrorBoundary.jsx   # Recovery screen if a component crashes
│   └── Welcome.jsx         # The first screen: replace it with your UI
├── index.css               # Tailwind import and base styles
├── main.js                 # Electron main process: window, security, IPC
├── preload.js              # Safe bridge between Electron and the page
└── renderer.jsx            # React entry point
tests/app.spec.js           # End-to-end tests (Playwright)
docs/                       # Documentation site (VitePress, GitHub Pages)
forge.config.js             # Packaging, installers, publishing and fuses
vite.renderer.config.mjs    # Vite, React, Tailwind and the Content Security Policy
```

An Electron app has three parts:

1. **Main process** (`src/main.js`) runs Node.js and controls windows and the app's lifecycle.
2. **Renderer** (`src/renderer.jsx`) is the React page inside the window. It has no Node.js access.
3. **Preload** (`src/preload.js`) is the only bridge between them. It exposes small, specific
   functions to the page.

Read the [project structure guide](https://bryanooko738.github.io/electron-react-vite/guide/project-structure)
to add your own features the same way.

## Security

| Protection              | What it does                                              |
| ----------------------- | --------------------------------------------------------- |
| Context isolation       | Keeps the page's JavaScript separate from Electron's      |
| Sandbox                 | Runs the page without Node.js access                      |
| Content Security Policy | Allows only the app's own scripts and styles              |
| Navigation guard        | Stops the window from loading other websites              |
| External links          | Opens `http(s)` links in the user's browser               |
| Electron fuses          | Disables Node.js debugging flags and checks the app files |

The end-to-end tests check these protections on every pull request. To report a vulnerability, see
[SECURITY.md](SECURITY.md).

## Releasing

```bash
npm version patch        # or minor / major
git push --follow-tags
```

GitHub Actions then builds installers on Windows, macOS and Linux and attaches them to a draft
[release](https://github.com/BRYANOOKO738/electron-react-vite/releases). Review it and click
**Publish**. See the [release guide](https://bryanooko738.github.io/electron-react-vite/guide/releasing).

> [!NOTE]
> The installers are not code-signed yet, so Windows SmartScreen and macOS Gatekeeper warn users
> when they open them.

## Troubleshooting

| Problem                                        | Fix                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| `npm install` fails while downloading Electron | Check your internet or proxy settings, then run `npm install` again.  |
| `npm start` fails after updating packages      | Delete `node_modules`, then run `npm install` again.                  |
| Blank window                                   | Open DevTools (`Ctrl+Shift+I` / `Cmd+Option+I`) and read the Console. |
| `npm run make` fails on Linux                  | Install `fakeroot` and `dpkg` for `.deb`, or `rpm` for `.rpm`.        |
| `npm test` fails on Linux with no display      | Run it with a virtual display: `xvfb-run npm test`.                   |

## Contributing

Contributions are welcome, from typo fixes to new features. Read [CONTRIBUTING.md](CONTRIBUTING.md)
to get set up, then pick an issue or open a new one.

## License

[MIT](LICENSE) © 2025 Bryan Onyango

You may use, copy, change and share this template, including in commercial apps, as long as the
copyright notice and license text are kept. If it helped you, a credit is appreciated:

> Built with [electron-react-vite](https://github.com/BRYANOOKO738/electron-react-vite) by Bryan Onyango.

## Author

**Bryan Onyango** · [@BRYANOOKO738](https://github.com/BRYANOOKO738) ·
[ookobryan8@gmail.com](mailto:ookobryan8@gmail.com)

If this project helped you, please give it a ⭐ on GitHub.
