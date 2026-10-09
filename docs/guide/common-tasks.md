# Common tasks

Short recipes for things almost every app needs.

## Rename your app

1. In `package.json`, change `name` (lowercase, no spaces, for example `my-notes`), `productName`
   (the name users see, for example `My Notes`) and `description`.
2. In `forge.config.js`, set `executableName` to the same value as `name`.
3. In `index.html`, change the `<title>`.

::: warning Keep name and executableName the same
The Linux installers look for a program called exactly like `name`. If the two differ,
`npm run make` fails on Linux.
:::

## Change the app icon

Replace the three files in `assets/icons/`, keeping their names:

| File        | Used for                  | Size                       |
| ----------- | ------------------------- | -------------------------- |
| `icon.png`  | Linux                     | 1024 × 1024 pixels         |
| `icon.ico`  | Windows and its installer | contains 16 to 256 pixels  |
| `icon.icns` | macOS                     | contains 16 to 1024 pixels |

Start from one 1024 × 1024 PNG and convert it to `.ico` and `.icns` with an icon converter. The new
icon shows up in apps built with `npm run package` or `npm run make`.

## Change the window

Edit the `BrowserWindow` options in `src/main/window.js`, for example:

```js
width: 1280,
height: 800,
minWidth: 640,
minHeight: 480,
```

See every option in the [BrowserWindow docs](https://www.electronjs.org/docs/latest/api/browser-window).

## Add a package from npm

```bash
npm install date-fns
```

Then import it where you need it, in the page or the main process:

```js
import { formatDistanceToNow } from 'date-fns';
```

Vite bundles it into the app automatically.

## Save settings and data

Store user data in the app's own folder, which Electron gives you in the main process:

```js
import { app } from 'electron';
import path from 'node:path';

const settingsFile = path.join(app.getPath('userData'), 'settings.json');
```

Read and write it in a handler in `src/main/ipc.js`, exactly like the note editor in
[Your first feature](/guide/first-feature). Never save next to the app itself: once the app is installed, that
folder is often read-only and is replaced on every update.

## Add more screens

For a few screens, keep the current screen in state:

```jsx
import { useState } from 'react';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [page, setPage] = useState('home');
  return page === 'home' ? (
    <HomePage onOpenSettings={() => setPage('settings')} />
  ) : (
    <SettingsPage onBack={() => setPage('home')} />
  );
}
```

For many screens, add a router such as [React Router](https://reactrouter.com/) and use its
`createHashRouter`: hash URLs work in the packaged app, where pages load from files.

## Debug your app

| Where the code runs | Where to see `console.log` and errors           |
| ------------------- | ----------------------------------------------- |
| `src/renderer`      | DevTools (opens automatically with `npm start`) |
| `src/preload`       | DevTools                                        |
| `src/main`          | The terminal where you ran `npm start`          |

Reopen DevTools with `Ctrl+Shift+I` (Windows, Linux) or `Cmd+Option+I` (macOS).

## Use web images or fonts

The Content Security Policy only allows files that ship with the app. Put images and fonts in
`src/renderer/assets/` and import them:

```jsx
import logo from '../assets/logo.svg';

<img src={logo} alt="My app" />;
```

To load something from the internet, add its address to the policy in `vite.renderer.config.mjs`,
for example `img-src 'self' data: https://images.example.com`. Add only addresses you trust.
