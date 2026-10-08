# electron-react-vite

A minimal, ready-to-build desktop app template using **Electron**, **React**, **Vite** and **Tailwind CSS**, packaged with **Electron Forge**.

Clone it, run one command and start building your desktop app with fast hot reload and a modern React setup.

![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Customising the app](#customising-the-app)
- [Building installers](#building-installers)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Electron 39** desktop shell for Windows, macOS and Linux.
- **React 19** user interface with JSX.
- **Vite 5** for near-instant start-up and hot module replacement (HMR) in development.
- **Tailwind CSS 4** through the official Vite plugin. No `tailwind.config.js` needed.
- **Electron Forge 7** for running, packaging and making installers.
- **Security fuses** enabled at package time (see [Security](#security)).
- Installer makers for **Windows (Squirrel)**, **macOS (ZIP)** and **Linux (DEB and RPM)**.

## Tech stack

| Layer      | Tool                                                                  | Version |
| ---------- | --------------------------------------------------------------------- | ------- |
| Desktop    | [Electron](https://www.electronjs.org/)                               | 39.1.0  |
| UI         | [React](https://react.dev/) and React DOM                             | ^19.2.0 |
| Bundler    | [Vite](https://vitejs.dev/) with `@vitejs/plugin-react`               | ^5.4.21 |
| Styling    | [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/vite`     | ^4.1.17 |
| Build/ship | [Electron Forge](https://www.electronforge.io/) with the Vite plugin  | ^7.10.2 |

## Requirements

- [Node.js](https://nodejs.org/) **18 or 20+** (an LTS release is recommended; tested with Node 22).
- npm (comes with Node.js).
- [Git](https://git-scm.com/).

To build Linux installers you also need the system packaging tools:

- `.deb`: `dpkg` and `fakeroot`
- `.rpm`: `rpm-build`

## Getting started

```bash
# 1. Clone the repository
git clone https://github.com/BRYANOOKO738/electron-react-vite.git
cd electron-react-vite

# 2. Install dependencies
npm install

# 3. Start the app in development mode
npm start
```

A desktop window opens with the app. Edit any file in `src/` and the window updates instantly.

## Scripts

| Command           | What it does                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| `npm start`       | Runs the app in development mode with hot reload.                                 |
| `npm run package` | Bundles the app into a runnable folder in `out/` (no installer).                  |
| `npm run make`    | Builds installers for the current platform in `out/make/`.                        |
| `npm run publish` | Publishes the build with Electron Forge (requires a publisher to be configured).  |
| `npm run lint`    | Placeholder. No linter is configured yet.                                         |

## Project structure

```text
electron-react-vite/
├── src/
│   ├── Components/
│   │   └── Hello.jsx          # Example React component
│   ├── index.css              # Tailwind import and base styles
│   ├── main.js                # Electron main process (creates the window)
│   ├── preload.js             # Preload script (bridge between main and renderer)
│   └── renderer.jsx           # React entry point, mounts <App /> into #root
├── index.html                 # HTML page loaded by the window
├── forge.config.js            # Electron Forge: build targets, makers and fuses
├── vite.main.config.mjs       # Vite config for the main process
├── vite.preload.config.mjs    # Vite config for the preload script
├── vite.renderer.config.mjs   # Vite config for the UI (React and Tailwind plugins)
├── package.json
├── LICENSE
└── README.md
```

## How it works

An Electron app runs in two kinds of process:

1. **Main process** (`src/main.js`) runs Node.js. It controls the app's lifecycle and creates an 800 × 600 `BrowserWindow`. In development it loads the Vite dev server; in production it loads the built `index.html`.
2. **Renderer process** (`index.html`, then `src/renderer.jsx`) is the web page inside the window. It renders the React app into the `#root` element.

The **preload script** (`src/preload.js`) runs before the page loads. It is the safe place to expose selected main-process features to the UI with Electron's `contextBridge`. It is empty in this template.

Electron Forge's Vite plugin builds all three parts, as set in `forge.config.js`.

## Customising the app

### Change the UI

Edit `src/Components/Hello.jsx`, or add new components and render them in `src/renderer.jsx`:

```jsx
// src/Components/Welcome.jsx
export default function Welcome() {
  return (
    <div className="rounded-xl bg-slate-100 p-6 text-center">
      <h1 className="text-2xl font-bold text-slate-800">Welcome!</h1>
    </div>
  );
}
```

Tailwind classes work in any component straight away.

### Rename the app

Update `name`, `productName` and `description` in `package.json`, and the `<title>` in `index.html`.

### Change the window

Edit the `BrowserWindow` options in `src/main.js`, for example `width`, `height` or `title`.

### Turn off DevTools

`src/main.js` always opens DevTools. To open them only in development, change the call to:

```js
if (!app.isPackaged) {
  mainWindow.webContents.openDevTools();
}
```

### Talk between the UI and Electron

Expose a small, safe API in `src/preload.js`:

```js
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),
});
```

Handle it in `src/main.js`:

```js
import { ipcMain } from 'electron';

ipcMain.handle('ping', () => 'pong');
```

Then call `await window.api.ping()` from any React component.

## Building installers

```bash
npm run make
```

The output goes to `out/make/`. Each platform builds its own installers:

| Platform | Maker    | Output                 |
| -------- | -------- | ---------------------- |
| Windows  | Squirrel | `Setup.exe`            |
| macOS    | ZIP      | `.zip` app bundle      |
| Linux    | DEB, RPM | `.deb` and `.rpm` packages |

To build for Windows or macOS, run the command on that operating system (or in CI on that platform).

## Security

The Forge **Fuses** plugin hardens the packaged app:

| Fuse                                    | Setting  | Effect                                                    |
| --------------------------------------- | -------- | --------------------------------------------------------- |
| `RunAsNode`                             | disabled | The app cannot be started as a plain Node.js process.     |
| `EnableCookieEncryption`                | enabled  | Cookies are encrypted on disk.                            |
| `EnableNodeOptionsEnvironmentVariable`  | disabled | `NODE_OPTIONS` is ignored.                                |
| `EnableNodeCliInspectArguments`         | disabled | `--inspect` debugging flags are ignored.                  |
| `EnableEmbeddedAsarIntegrityValidation` | enabled  | The app archive is checked for tampering.                 |
| `OnlyLoadAppFromAsar`                   | enabled  | App code loads only from the packaged `app.asar` archive. |

Follow the [Electron security checklist](https://www.electronjs.org/docs/latest/tutorial/security) as the app grows. In particular, keep `contextIsolation` on and expose only what you need through the preload script.

## Troubleshooting

| Problem                                          | Fix                                                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `npm start` fails after updating dependencies    | Delete `node_modules` and `package-lock.json`, then run `npm install` again.              |
| Electron download fails during `npm install`     | Check your internet or proxy settings, then run `npm install` again.                      |
| Blank window                                     | Open DevTools (`Ctrl+Shift+I` or `Cmd+Option+I`) and check the Console for errors.        |
| `npm run make` fails on Linux                    | Install `dpkg` and `fakeroot` for `.deb`, or `rpm-build` for `.rpm`.                       |
| Tailwind classes have no effect                  | Make sure `src/index.css` starts with `@import "tailwindcss";` and is imported in `renderer.jsx`. |

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a pull request.

For bugs and ideas, please open an [issue](https://github.com/BRYANOOKO738/electron-react-vite/issues).

## License

This project is licensed under the **MIT License**. See [`LICENSE`](LICENSE) for the full text.

Copyright © 2025 **Bryan Onyango**

You may use, copy, modify, merge, publish, distribute, sublicense and sell copies of this software, as long as the copyright notice and the license text are included in all copies or substantial parts of it. The software is provided "as is", without warranty of any kind.

If you use this template, a credit is appreciated:

> Built with [electron-react-vite](https://github.com/BRYANOOKO738/electron-react-vite) by Bryan Onyango.

## Author

**Bryan Onyango**

- GitHub: [@BRYANOOKO738](https://github.com/BRYANOOKO738)
- Email: [onyangobryan8@gmail.com](mailto:onyangobryan8@gmail.com)

If this project helped you, please give it a ⭐ on GitHub.

## Acknowledgements

- [Electron](https://www.electronjs.org/) and [Electron Forge](https://www.electronforge.io/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
