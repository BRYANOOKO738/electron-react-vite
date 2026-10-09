# Getting started

This guide takes you from nothing to a running desktop app in about five minutes. No Electron
experience needed.

## 1. Install the tools

You need two free tools. Install them once.

| Tool                                 | Why                          | Check it works  |
| ------------------------------------ | ---------------------------- | --------------- |
| [Node.js](https://nodejs.org/) (LTS) | Runs the build tools and npm | `node -v`       |
| [Git](https://git-scm.com/downloads) | Downloads the template       | `git --version` |

Open a terminal (on Windows: **PowerShell**; on macOS: **Terminal**) and run the commands in the last
column. Each should print a version number. Node.js must be **22.13 or newer**.

::: tip Use a code editor
[Visual Studio Code](https://code.visualstudio.com/) is free and works well with this template.
:::

## 2. Create your app

```bash
git clone https://github.com/BRYANOOKO738/electron-react-vite.git my-app
cd my-app
npm run setup
```

`npm run setup` checks your Node.js version, then downloads Electron and the other packages while
showing its progress. It takes a minute or two the first time. When it finishes, it shows the
commands you need next:

```text
  Electron React Vite · setup

  ✔ Node.js 22.22.0
  ✔ Packages installed 12.6s

  ╭──────────────────────────────────────────────────────────────╮
  │  Your app is ready.                                          │
  │                                                              │
  │  npm start       Start the app with hot reload               │
  │  npm test        Run the end-to-end tests                    │
  │  npm run make    Build installers                            │
  │                                                              │
  │  Start editing: src/renderer/App.jsx                         │
  │  Guide: https://bryanooko738.github.io/electron-react-vite/  │
  ╰──────────────────────────────────────────────────────────────╯
```

::: tip Prefer plain npm?
`npm install` works too. You see npm's own progress, then the same summary at the end.
:::

## 3. Start it

```bash
npm start
```

A window opens with the welcome screen, and DevTools opens next to it so you can see errors and logs.

## 4. Make your first change

Open `src/renderer/App.jsx` and replace its content with:

```jsx
export default function App() {
  return <h1 className="p-8 text-3xl font-bold">Hello, desktop!</h1>;
}
```

Save the file. The window updates instantly. You just edited a desktop app with React and Tailwind.

::: info What reloads when
Changes in `src/renderer` update the window instantly, and changes in `src/preload` reload it.
Changes in `src/main` are rebuilt automatically, but the running app keeps the old code until you
restart it: type `rs` in the terminal and press Enter.
:::

## 5. Check your work

```bash
npm run check   # finds mistakes and formatting problems
npm test        # starts the real app and runs the tests
```

## Every command

| Command            | What it does                                        |
| ------------------ | --------------------------------------------------- |
| `npm run setup`    | Checks Node.js and installs everything (first time) |
| `npm start`        | Runs the app in development mode with hot reload    |
| `npm test`         | Builds the app and runs the end-to-end tests        |
| `npm run check`    | Runs ESLint and the Prettier format check           |
| `npm run lint:fix` | Fixes lint problems that can be fixed automatically |
| `npm run format`   | Formats every file                                  |
| `npm run package`  | Bundles the app into `out/` (no installer)          |
| `npm run make`     | Builds installers for your system into `out/make/`  |
| `npm run docs:dev` | Runs this documentation site locally                |

## Next steps

1. Learn [where each kind of code goes](/guide/project-structure).
2. Build [your first feature](/guide/first-feature): a note editor that saves files.
3. Look up [common tasks](/guide/common-tasks) such as renaming the app or changing its icon.
4. [Ship it](/guide/releasing) to users.
