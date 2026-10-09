# Security

The template follows the [Electron security checklist](https://www.electronjs.org/docs/latest/tutorial/security).

| Protection              | Where                      | What it does                                         |
| ----------------------- | -------------------------- | ---------------------------------------------------- |
| Context isolation       | `src/main/window.js`       | Keeps the page's JavaScript separate from Electron's |
| Sandbox                 | `src/main/window.js`       | Runs the page without Node.js access                 |
| Navigation guard        | `src/main/security.js`     | Blocks the window from loading other sites           |
| External links          | `src/main/security.js`     | Opens `http(s)` links in the user's browser          |
| Content Security Policy | `vite.renderer.config.mjs` | Allows only the app's own scripts and styles         |
| Electron fuses          | `forge.config.js`          | Disables Node.js flags and checks the app archive    |

The end-to-end tests in `tests/app.spec.js` check these protections every time CI runs.

## Keep it safe as you build

- Expose **small, specific functions** in `src/preload/preload.js`. Never expose `ipcRenderer`,
  `require` or whole Node.js modules.
- **Validate** everything a handler in `src/main/ipc.js` receives from the page.
- Load only your own files. If you must allow a website, add only that address to the Content
  Security Policy.
- Keep Electron up to date: Dependabot opens pull requests for new versions.

To report a vulnerability, see the
[security policy](https://github.com/BRYANOOKO738/electron-react-vite/security/policy).
