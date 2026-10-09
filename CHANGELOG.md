# Changelog

All notable changes to this project are documented here. New versions are added automatically by
[Release Please](https://github.com/googleapis/release-please) from
[Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:` ...), and this project
uses [Semantic Versioning](https://semver.org/).

## [1.1.0](https://github.com/BRYANOOKO738/electron-react-vite/compare/v1.0.0...v1.1.0) (2026-10-09)


### Added

* animated logo and redesigned welcome screen ([aad3ef9](https://github.com/BRYANOOKO738/electron-react-vite/commit/aad3ef954be1c826f6562180b865c98a935254a7))
* animated logo and redesigned welcome screen ([6684066](https://github.com/BRYANOOKO738/electron-react-vite/commit/6684066fbbf569b003257f5497d983fb612d0eb1))
* automate releases and add security, review and community bots ([c3de9b9](https://github.com/BRYANOOKO738/electron-react-vite/commit/c3de9b95b2953de2c10748133475611301bcb792))
* automate releases with Release Please ([af9c971](https://github.com/BRYANOOKO738/electron-react-vite/commit/af9c971592ff9567fdc55855c0242c5b4d329957))

## 1.0.0 (2026-10-09)

### Added

- `npm run setup`: checks Node.js, installs with an animated progress spinner and timer, and
  shows the next steps; a short summary also appears after a plain `npm install`.
- Welcome screen with light and dark mode, showing the runtime versions and an IPC example.
- Safe preload bridge (`window.electronApp`) and an `app:get-info` IPC handler.
- End-to-end tests with Playwright that start the real app (`npm test`).
- Error boundary with a reload screen, and React `StrictMode`.
- Crash recovery, a single-instance lock and no white flash at start-up.
- Documentation site (VitePress) published to GitHub Pages, with a download page.
- Automatic GitHub releases with installers for Windows, macOS and Linux.
- CI: lint, format check, tests and installer builds on every pull request.
- ESLint, Prettier, EditorConfig, Dependabot, issue forms, a pull request template,
  CONTRIBUTING.md and SECURITY.md.
- App icon for Windows, macOS and Linux, used by the app and its installers.
- Download page that lists the latest release's installers and highlights the one for the
  visitor's computer.
- Guides: "Your first feature" tutorial, "Common tasks" and "Troubleshooting"; rewritten
  "Getting started" and "Project structure".
- macOS releases for both Apple Silicon and Intel.
- Shared test helpers (`tests/helpers.js`).

### Changed

- Electron Forge 8 (needs Node.js 22.13 or newer), `@electron/fuses` 2, React 19.3,
  Tailwind CSS 4.3.3, `actions/checkout` v7 and `actions/deploy-pages` v5. The main and preload
  bundles are now `.vite/build/main.cjs` and `preload.cjs`.
- CI runs on `main` are no longer cancelled by the next push; only older pull request runs are.
- Dependabot groups Tailwind packages, moves `@electron/fuses` with Forge, and skips ESLint
  major versions until `eslint-plugin-react` supports ESLint 10.
- Electron Forge packages updated to 7.11.2.
- Renamed the app from `my-app` to `electron-react-vite` ("Electron React Vite").
- Source split into `src/main`, `src/preload`, `src/renderer` and `src/shared`, with the main
  process split into `main.js`, `window.js`, `ipc.js` and `security.js`.
- IPC channel names live in `src/shared/ipc-channels.js`.
- Welcome screen uses a `useAppInfo` hook and a `LinkCard` component.

### Fixed

- The docs said changes in `src/main` restart the app automatically. They do not: type `rs`.
- `package.json` was not valid JSON, so `npm install` failed.
- `package-lock.json` did not include the lint, docs and publishing packages, so `npm ci` failed.
- DevTools opened in the packaged app.
- The renderer had no Content Security Policy.
- The window could navigate to other websites, and links opened inside the app.
- Release workflow: the three build jobs could each create their own draft release. The release
  is now created once before the builds, and tests run before anything is published.
- Tests could fail when there was more than one test file, because the single-instance lock
  closed the second app. Tests now run one app at a time.

### First version

- First version: Electron, React, Vite and Tailwind CSS template.
