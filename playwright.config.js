const { defineConfig } = require('@playwright/test');

// End-to-end tests that start the real Electron app. Run them with `npm test`.
module.exports = defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  // One app at a time: the app allows only a single running copy (see src/main/main.js).
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
});
