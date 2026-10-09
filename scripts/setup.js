// Guided first-time setup: `npm run setup`.
// Checks Node.js, installs the packages with a progress spinner, then shows the next steps.
const { spawn } = require('node:child_process');
const { checkNodeVersion, color, printNextSteps, spinner, symbols } = require('./terminal');

const MINIMUM_NODE = '22.13';

// Runs `npm install`, keeping its output to show only if it fails.
function npmInstall() {
  return new Promise((resolve) => {
    const command = 'npm install --no-fund --no-audit';
    const options = { env: { ...process.env, ELECTRON_REACT_VITE_SETUP: '1' } };
    // On Windows, npm is a .cmd script and must be started through the shell.
    const child =
      process.platform === 'win32'
        ? spawn(command, { ...options, shell: true })
        : spawn('npm', command.split(' ').slice(1), options);
    let output = '';
    child.stdout.on('data', (chunk) => (output += chunk));
    child.stderr.on('data', (chunk) => (output += chunk));
    child.on('error', (error) => resolve({ code: 1, output: String(error) }));
    child.on('close', (code) => resolve({ code, output }));
  });
}

async function main() {
  console.log(`\n  ${color.bold('Electron React Vite')} ${color.dim('· setup')}\n`);

  const node = checkNodeVersion(MINIMUM_NODE);
  if (!node.ok) {
    console.log(`  ${color.red(symbols.fail)} Node.js ${node.version} is too old.`);
    console.log(
      `    Install Node.js ${MINIMUM_NODE} or newer from ${color.cyan('https://nodejs.org/')}\n`,
    );
    process.exitCode = 1;
    return;
  }
  console.log(`  ${color.green(symbols.ok)} Node.js ${node.version}`);

  const install = spinner('Installing packages (the first time takes a minute or two)');
  const { code, output } = await npmInstall();
  if (code !== 0) {
    install.fail('Installing packages failed');
    console.log(color.dim(`\n${output.trim().split('\n').slice(-20).join('\n')}\n`));
    console.log(
      `  ${color.yellow(symbols.warn)} Check your internet connection and run ${color.cyan('npm run setup')} again.`,
    );
    console.log(
      `    More help: ${color.cyan('https://bryanooko738.github.io/electron-react-vite/guide/troubleshooting')}\n`,
    );
    process.exitCode = 1;
    return;
  }
  install.succeed('Packages installed');

  console.log('');
  printNextSteps();
  console.log('');
}

main();
