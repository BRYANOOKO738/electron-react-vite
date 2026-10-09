# Security

The template follows the [Electron security checklist](https://www.electronjs.org/docs/latest/tutorial/security).

| Protection              | Where                      | What it does                                         |
| ----------------------- | -------------------------- | ---------------------------------------------------- |
| Context isolation       | `src/main.js`              | Keeps the page's JavaScript separate from Electron's |
| Sandbox                 | `src/main.js`              | Runs the page without Node.js access                 |
| Navigation guard        | `src/main.js`              | Blocks the window from loading other sites           |
| External links          | `src/main.js`              | Opens `http(s)` links in the user's browser          |
| Content Security Policy | `vite.renderer.config.mjs` | Allows only the app's own scripts and styles         |
| Electron fuses          | `forge.config.js`          | Disables Node.js flags and checks the app archive    |

To report a vulnerability, see the
[security policy](https://github.com/BRYANOOKO738/electron-react-vite/security/policy).
