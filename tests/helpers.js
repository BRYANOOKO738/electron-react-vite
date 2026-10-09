const { _electron: electron } = require('@playwright/test');

// Starts the app built by `npm run package` (package.json "main" points at .vite/build/main.js).
// Linux CI runners block Chromium's sandbox, so it is disabled there for tests only.
function launchApp() {
  return electron.launch({
    args: ['.', ...(process.platform === 'linux' ? ['--no-sandbox'] : [])],
  });
}

// The app window, not the detached DevTools window that opens in development builds.
async function appWindow(app) {
  const isAppPage = (page) => !page.url().startsWith('devtools://');
  return app.windows().find(isAppPage) ?? app.waitForEvent('window', { predicate: isAppPage });
}

module.exports = { launchApp, appWindow };
