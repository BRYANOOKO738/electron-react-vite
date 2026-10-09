// Small terminal helpers for the setup scripts: colours, symbols and a spinner.
// No dependencies, so they work before `npm install` has run.

const isInteractive = Boolean(process.stdout.isTTY) && !process.env.CI;
const useColor = isInteractive && !('NO_COLOR' in process.env) && process.env.TERM !== 'dumb';

// Classic Windows consoles lack the fancy glyphs; Windows Terminal and VS Code have them.
const fancyGlyphs =
  process.platform !== 'win32' ||
  Boolean(process.env.WT_SESSION) ||
  process.env.TERM_PROGRAM === 'vscode';

const paint = (code) => (text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : String(text));
const color = {
  bold: paint('1'),
  dim: paint('2'),
  red: paint('31'),
  green: paint('32'),
  yellow: paint('33'),
  cyan: paint('36'),
};

const symbols = fancyGlyphs
  ? {
      ok: '✔',
      fail: '✖',
      warn: '▲',
      arrow: '›',
      frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    }
  : { ok: '√', fail: '×', warn: '!', arrow: '>', frames: ['|', '/', '-', '\\'] };

const formatSeconds = (ms) => `${(ms / 1000).toFixed(1)}s`;

// Shows "⠋ text (3.2s)" while a step runs, then a ✔ or ✖ line.
// In CI or a non-interactive terminal it prints plain lines instead of animating.
function spinner(text) {
  const start = Date.now();
  let frame = 0;
  let timer = null;

  const render = () => {
    const icon = color.cyan(symbols.frames[frame++ % symbols.frames.length]);
    process.stdout.write(
      `\r\x1b[2K  ${icon} ${text} ${color.dim(formatSeconds(Date.now() - start))}`,
    );
  };

  // Ctrl+C while animating: show the cursor again before exiting.
  const onInterrupt = () => {
    process.stdout.write('\x1b[?25h\n');
    process.exit(130);
  };

  if (isInteractive) {
    process.stdout.write('\x1b[?25l'); // hide the cursor while animating
    process.once('SIGINT', onInterrupt);
    render();
    timer = setInterval(render, 80);
  } else {
    console.log(`  ${symbols.arrow} ${text}...`);
  }

  const stop = (icon, message) => {
    if (timer) {
      clearInterval(timer);
      process.removeListener('SIGINT', onInterrupt);
      process.stdout.write('\r\x1b[2K\x1b[?25h'); // clear the line, show the cursor again
    }
    console.log(`  ${icon} ${message} ${color.dim(formatSeconds(Date.now() - start))}`);
  };

  return {
    succeed: (message = text) => stop(color.green(symbols.ok), message),
    fail: (message = text) => stop(color.red(symbols.fail), message),
  };
}

// Prints lines inside a rounded box.
function box(lines) {
  // eslint-disable-next-line no-control-regex
  const visible = (line) => line.replace(/\x1b\[[0-9;]*m/g, '').length;
  const width = Math.max(...lines.map(visible));
  const [tl, tr, bl, br, h, v] = fancyGlyphs
    ? ['╭', '╮', '╰', '╯', '─', '│']
    : ['+', '+', '+', '+', '-', '|'];
  const pad = (line) => line + ' '.repeat(width - visible(line));
  console.log(color.dim(`  ${tl}${h.repeat(width + 4)}${tr}`));
  for (const line of lines) console.log(`  ${color.dim(v)}  ${pad(line)}  ${color.dim(v)}`);
  console.log(color.dim(`  ${bl}${h.repeat(width + 4)}${br}`));
}

// Shown when setup finishes and after a plain `npm install`.
function printNextSteps() {
  box([
    color.bold('Your app is ready.'),
    '',
    `${color.cyan('npm start')}       Start the app with hot reload`,
    `${color.cyan('npm test')}        Run the end-to-end tests`,
    `${color.cyan('npm run make')}    Build installers`,
    '',
    `Start editing: ${color.bold('src/renderer/App.jsx')}`,
    `Guide: ${color.cyan('https://bryanooko738.github.io/electron-react-vite/')}`,
  ]);
}

// Fails early with a clear message on Node.js versions this template does not support.
// `minimum` is "major.minor", for example "22.13".
function checkNodeVersion(minimum) {
  const [major, minor] = process.versions.node.split('.').map(Number);
  const [minMajor, minMinor] = minimum.split('.').map(Number);
  const ok = major > minMajor || (major === minMajor && minor >= minMinor);
  return { ok, version: process.versions.node };
}

module.exports = { box, checkNodeVersion, color, isInteractive, printNextSteps, spinner, symbols };
