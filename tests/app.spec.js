const { test, expect, _electron: electron } = require('@playwright/test');

// Starts the app built by `npm run package` (package.json "main" points at .vite/build/main.js).
// Linux CI runners block Chromium's sandbox, so it is disabled there for the test only.
const launchApp = () =>
  electron.launch({
    args: ['.', ...(process.platform === 'linux' ? ['--no-sandbox'] : [])],
  });

// The app window, not the detached DevTools window that opens in development.
const appWindow = async (app) => {
  const isAppPage = (page) => !page.url().startsWith('devtools://');
  return app.windows().find(isAppPage) ?? app.waitForEvent('window', { predicate: isAppPage });
};

test('starts and shows the welcome screen without errors', async () => {
  const app = await launchApp();
  const window = await appWindow(app);

  const errors = [];
  window.on('pageerror', (error) => errors.push(error.message));
  window.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await expect(window).toHaveTitle('Electron React Vite');
  await expect(window.getByRole('heading', { level: 1 })).toHaveText('Your desktop app is ready.');

  // The preload bridge exposes the runtime versions...
  const electronVersion = await app.evaluate(() => process.versions.electron);
  await expect(window.getByLabel('Runtime versions')).toContainText(electronVersion);
  // ...and the IPC round trip to the main process returns the app version.
  const appVersion = await app.evaluate(({ app }) => app.getVersion());
  await expect(window.getByText(`v${appVersion}`)).toBeVisible();

  expect(errors).toEqual([]);
  await app.close();
});

test('is locked down: no Node.js in the page and a Content Security Policy', async () => {
  const app = await launchApp();
  const window = await appWindow(app);
  await window.waitForLoadState('domcontentloaded');

  expect(await window.evaluate(() => typeof require)).toBe('undefined');
  expect(await window.evaluate(() => typeof process)).toBe('undefined');
  const csp = await window
    .locator('meta[http-equiv="Content-Security-Policy"]')
    .getAttribute('content');
  expect(csp).toContain("default-src 'self'");

  await app.close();
});

test('opens external links in the browser, not inside the app', async () => {
  const app = await launchApp();
  const window = await appWindow(app);

  // Record openExternal calls instead of launching a real browser.
  await app.evaluate(({ shell }) => {
    globalThis.openedUrls = [];
    shell.openExternal = async (url) => {
      globalThis.openedUrls.push(url);
    };
  });

  const startUrl = window.url();
  await window.getByRole('link', { name: /Documentation/ }).click();

  await expect
    .poll(() => app.evaluate(() => globalThis.openedUrls))
    .toEqual(['https://bryanooko738.github.io/electron-react-vite/']);
  expect(window.url()).toBe(startUrl);
  expect(app.windows().filter((page) => !page.url().startsWith('devtools://'))).toHaveLength(1);

  await app.close();
});
