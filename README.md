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
- **Clear folders.** `main`, `preload`, `renderer` and `shared`: you always know where code goes.
- **Learn by example.** A working IPC example in the code, and a step-by-step
  [first-feature tutorial](https://bryanooko738.github.io/electron-react-vite/guide/first-feature)
  where you build a note editor that saves files.
- **Reliable.** Crash recovery, an error screen instead of a blank window, one running copy at a
  time, and end-to-end tests that start the real app.
- **Ready to ship.** App icons included. One command builds installers for Windows, macOS (Apple
  Silicon and Intel) and Linux, and a version tag publishes them to GitHub Releases.
- **Clean code from day one.** ESLint, Prettier and CI on every pull request.

## Quick start

You need [Node.js](https://nodejs.org/) 22.13 or newer and [Git](https://git-scm.com/).

```bash
git clone https://github.com/BRYANOOKO738/electron-react-vite.git my-app
cd my-app
npm run setup    # checks Node.js and installs everything, with progress
npm start
```

The app opens. Edit `src/renderer/App.jsx`, save, and watch the window update.

New to Electron? Follow the [getting started guide](https://bryanooko738.github.io/electron-react-vite/guide/getting-started).
No Git? [Download the ZIP](https://github.com/BRYANOOKO738/electron-react-vite/archive/refs/heads/main.zip).

## Scripts

| Command            | What it does                                        |
| ------------------ | --------------------------------------------------- |
| `npm run setup`    | Checks Node.js and installs everything (first time) |
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
├── main/                  # Main process (Node.js): windows, files, the operating system
│   ├── main.js            #   Starts the app and manages its lifecycle
│   ├── window.js          #   Creates the window with secure settings
│   ├── ipc.js             #   Answers requests from the page
│   └── security.js        #   Blocks unsafe navigation, opens links in the browser
├── preload/preload.js     # The bridge: what the page may ask the main process
├── renderer/              # The page (React): everything the user sees
│   ├── App.jsx            #   The root component: start here
│   ├── components/        #   Reusable UI
│   ├── hooks/             #   Reusable React logic
│   └── styles/index.css   #   Tailwind and global styles
└── shared/                # Code used by both main and preload (IPC channel names)
assets/icons/              # App icon for Windows, macOS and Linux
scripts/                   # npm run setup and the after-install summary
tests/                     # End-to-end tests that start the real app (Playwright)
docs/                      # Documentation site (VitePress, GitHub Pages)
forge.config.js            # Packaging, installers, icons and publishing
vite.renderer.config.mjs   # Vite, React, Tailwind and the Content Security Policy
```

The page never touches Node.js directly. It asks through the preload bridge, and the main process
decides:

```text
React component  →  window.electronApp.getAppInfo()  →  preload.js  →  main/ipc.js
```

Read [where does my code go?](https://bryanooko738.github.io/electron-react-vite/guide/project-structure#where-does-my-code-go)
and how to organise a growing app.

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

Merge the **"chore(main): release x.y.z"** pull request that Release Please keeps up to date. It
creates the release, and the installers for Windows, macOS (Apple Silicon and Intel) and Linux are
built and attached automatically. See the [release guide](https://bryanooko738.github.io/electron-react-vite/guide/releasing).

> [!NOTE]
> The installers are not code-signed yet, so Windows SmartScreen and macOS Gatekeeper warn users
> when they open them.

## Automation

| Bot                | What it does                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| CI                 | Lint, format, end-to-end tests and installer builds on Windows, macOS, Linux |
| Release Please     | Writes the changelog and opens release pull requests from commit messages    |
| Release            | Builds and uploads the installers for every release                          |
| Docs               | Publishes the documentation site to GitHub Pages                             |
| CodeQL             | Scans the code for security problems on every pull request and weekly        |
| Dependency Review  | Blocks pull requests that add packages with known vulnerabilities            |
| Dependabot         | Opens pull requests to keep packages and actions up to date                  |
| Pull Request Title | Checks titles follow Conventional Commits (used for versions and changelog)  |
| Labeler            | Labels pull requests by the parts of the project they change                 |
| Welcome            | Greets first-time contributors                                               |
| Stale              | Closes issues and pull requests with no activity for 74 days                 |
| Links              | Checks the web links in the README and docs                                  |

## Troubleshooting

| Problem                                        | Fix                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| `npm install` fails while downloading Electron | Check your internet or proxy settings, then run `npm install` again.  |
| `npm start` fails after updating packages      | Delete `node_modules`, then run `npm install` again.                  |
| Blank window                                   | Open DevTools (`Ctrl+Shift+I` / `Cmd+Option+I`) and read the Console. |
| `npm run make` fails on Linux                  | Install `fakeroot` and `dpkg` for `.deb`, or `rpm` for `.rpm`.        |
| `npm test` fails on Linux with no display      | Run it with a virtual display: `xvfb-run npm test`.                   |

More answers in the [troubleshooting guide](https://bryanooko738.github.io/electron-react-vite/guide/troubleshooting).

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
