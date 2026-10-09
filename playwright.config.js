const { defineConfig } = require('@playwright/test');

// End-to-end tests that start the real Electron app. Run them with `npm test`.
module.exports = defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
});
