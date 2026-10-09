// Runs after `npm install` and shows the next steps.
// Skipped in CI and inside `npm run setup` (which prints its own summary).
// It never fails the install.
try {
  if (!process.env.CI && !process.env.ELECTRON_REACT_VITE_SETUP) {
    const { printNextSteps } = require('./terminal');
    console.log('');
    printNextSteps();
    console.log('');
  }
} catch {
  // A welcome message is never worth a failed install.
}
