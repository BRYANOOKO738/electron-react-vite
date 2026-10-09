# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

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

### Changed

- Electron Forge packages updated to 7.11.2.
- Renamed the app from `my-app` to `electron-react-vite` ("Electron React Vite").

### Fixed

- `package.json` was not valid JSON, so `npm install` failed.
- `package-lock.json` did not include the lint, docs and publishing packages, so `npm ci` failed.
- DevTools opened in the packaged app.
- The renderer had no Content Security Policy.
- The window could navigate to other websites, and links opened inside the app.

## [1.0.0]

- First version: Electron, React, Vite and Tailwind CSS template.

[Unreleased]: https://github.com/BRYANOOKO738/electron-react-vite/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/BRYANOOKO738/electron-react-vite/releases/tag/v1.0.0
