# Getting started

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer (the version in `.nvmrc` is recommended)
- npm
- [Git](https://git-scm.com/)

## Create your app

```bash
git clone https://github.com/BRYANOOKO738/electron-react-vite.git my-app
cd my-app
npm install
npm start
```

A window opens with the welcome screen. Open `src/Components/Welcome.jsx`, change some text and
save: the window updates instantly.

## Next steps

- Learn how the parts fit together in [Project structure](/guide/project-structure).
- See what keeps your app safe in [Security](/guide/security).
- Ship it to users with [Building and releasing](/guide/releasing).

## Scripts

| Command            | What it does                                     |
| ------------------ | ------------------------------------------------ |
| `npm start`        | Runs the app in development mode with hot reload |
| `npm run package`  | Bundles the app into `out/` (no installer)       |
| `npm run make`     | Builds installers into `out/make/`               |
| `npm test`         | Builds the app and runs the end-to-end tests     |
| `npm run lint`     | Checks the code with ESLint                      |
| `npm run format`   | Formats the code with Prettier                   |
| `npm run check`    | Runs lint and the format check                   |
| `npm run docs:dev` | Runs this documentation site locally             |
