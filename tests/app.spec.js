const { test, expect } = require('@playwright/test');
const { appWindow, launchApp } = require('./helpers');

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

test('welcome screen fits the default window without scrolling', async () => {
  const app = await launchApp();
  const window = await appWindow(app);
  // Wait for the entrance animations (the last card starts at 1.1 s).
  await expect(window.getByRole('link', { name: /Tailwind CSS/ })).toBeVisible();
  await window.waitForTimeout(1500);

  const { scrollHeight, clientHeight } = await window.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
  }));
  expect(scrollHeight).toBeLessThanOrEqual(clientHeight);

  await app.close();
});

test('shows everything at once when the system asks for reduced motion', async () => {
  const app = await launchApp();
  const window = await appWindow(app);
  await window.emulateMedia({ reducedMotion: 'reduce' });
  await window.reload();

  // Without reduced motion the last card is still invisible at this point.
  await window.waitForTimeout(150);
  const opacity = await window
    .getByRole('link', { name: /Tailwind CSS/ })
    .evaluate((element) => getComputedStyle(element).opacity);
  expect(Number(opacity)).toBe(1);

  await app.close();
});
