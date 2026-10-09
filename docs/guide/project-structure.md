# Project structure

An Electron app is really **two programs** that talk to each other: a Node.js program that controls
the app (the **main process**) and a web page inside each window (the **renderer**). This template
keeps them in separate folders, so you always know where code belongs.

```text
my-app/
├── src/
│   ├── main/                  Main process (Node.js): windows, files, the operating system
│   │   ├── main.js              Starts the app and manages its lifecycle
│   │   ├── window.js            Creates the app window with secure settings
│   │   ├── ipc.js               Answers requests from the page
│   │   └── security.js          Blocks unsafe navigation, opens links in the browser
│   ├── preload/
│   │   └── preload.js         The bridge: chooses what the page may ask the main process
│   ├── renderer/              The page (React): everything the user sees
│   │   ├── main.jsx             Mounts React into index.html
│   │   ├── App.jsx              The root component: start here
│   │   ├── components/          Reusable pieces of UI
│   │   ├── hooks/               Reusable React logic (for example useAppInfo)
│   │   └── styles/index.css     Tailwind and global styles
│   └── shared/
│       └── ipc-channels.js    Names shared by main and preload
├── assets/icons/              App icon for Windows (.ico), macOS (.icns) and Linux (.png)
├── tests/                     End-to-end tests that start the real app
├── docs/                      This documentation site
├── index.html                 The HTML page loaded into the window
├── forge.config.js            Packaging, installers, icons and publishing
└── vite.renderer.config.mjs   Vite, React, Tailwind and the Content Security Policy
```

## Where does my code go?

| I want to…                                       | Put it in                                    |
| ------------------------------------------------ | -------------------------------------------- |
| Add a button, form, list or any UI               | `src/renderer/components/`                   |
| Add a whole screen                               | `src/renderer/pages/` (create the folder)    |
| Share logic between components (data loading…)   | `src/renderer/hooks/`                        |
| Read or write files, open dialogs, notifications | `src/main/ipc.js` + `src/preload/preload.js` |
| Change the window size, title bar or menu        | `src/main/window.js`                         |
| Add a constant used by main and preload          | `src/shared/`                                |
| Add images or fonts used by the page             | `src/renderer/assets/` (create the folder)   |
| Change the app icon                              | `assets/icons/`                              |

## How the page talks to Electron

The page cannot use Node.js directly. That is on purpose: if it could, any bug or injected script
in the page could read and delete files. Instead, the page asks, and the main process decides.

```text
React component          preload.js                  main/ipc.js
───────────────          ──────────                  ───────────
window.electronApp   →   ipcRenderer.invoke(...)  →  ipcMain.handle(...)
   .getAppInfo()                                        returns { name, version }
        ↑                                                       │
        └───────────────────────── answer ──────────────────────┘
```

The template already contains one working example, `getAppInfo`. Every new feature follows the
same four steps, shown in full in [Your first feature](/guide/first-feature):

1. Name the channel in `src/shared/ipc-channels.js`.
2. Handle it in `src/main/ipc.js`.
3. Expose a function for it in `src/preload/preload.js`.
4. Call that function from a component.

## Growing your app

When the app gets bigger, group code by **feature** instead of by type:

```text
src/renderer/
├── pages/
│   ├── HomePage.jsx
│   └── SettingsPage.jsx
├── features/
│   └── notes/
│       ├── NoteEditor.jsx
│       ├── NoteList.jsx
│       └── useNotes.js
└── components/        Only UI used by several features (buttons, cards, dialogs)
```

The same idea works in `src/main`: split `ipc.js` into one file per feature (for example
`src/main/ipc/notes.js`) and call each one from `registerIpcHandlers()`.
