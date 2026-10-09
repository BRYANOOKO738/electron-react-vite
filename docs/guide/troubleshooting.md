# Troubleshooting

## Installing

**`npm install` fails while downloading Electron.**
Check your internet connection, then run `npm install` again. Behind a company proxy, follow
Electron's [proxy instructions](https://www.electronjs.org/docs/latest/tutorial/installation#proxies).

**`node -v` prints a version below 20, or "command not found".**
Install the LTS version from [nodejs.org](https://nodejs.org/), then open a new terminal.

## Running

**The window is blank.**
Look at DevTools (`Ctrl+Shift+I` / `Cmd+Option+I`), tab **Console**. A red error tells you the file
and line. If DevTools shows nothing, check the terminal for main-process errors.

**"Something went wrong" screen.**
A component threw an error while rendering. The message is shown on the screen and in the Console.
Fix it and click **Reload**.

**`window.electronApp` is undefined.**
The page is running outside Electron (for example, opened in a browser), or the preload script
failed. Check the terminal for errors from `src/preload/preload.js`.

**"Refused to load ... because it violates the Content Security Policy".**
The page tried to load something from the internet. See
[Use web images or fonts](/guide/common-tasks#use-web-images-or-fonts).

**Only one copy of the app opens.**
That is on purpose: a second launch focuses the window that is already open
(see `src/main/main.js`).

## Building

**`npm run make` fails on Linux.**
Install the packaging tools: `sudo apt install fakeroot dpkg rpm`.

**`npm test` fails on Linux with "Missing X server or $DISPLAY".**
Run it with a virtual display: `xvfb-run npm test` (install with `sudo apt install xvfb`).

**`npm run make` fails on Linux after renaming the app.**
`name` in `package.json` and `executableName` in `forge.config.js` must be the same. See
[Rename your app](/guide/common-tasks#rename-your-app).

**Windows or macOS warns that the app is from an unknown developer.**
The app is not code-signed. See [Building and releasing](/guide/releasing#code-signing).

## Still stuck?

Search the [issues](https://github.com/BRYANOOKO738/electron-react-vite/issues) or
[open a new one](https://github.com/BRYANOOKO738/electron-react-vite/issues/new/choose). Include
your operating system, `node -v` and the full error message.
