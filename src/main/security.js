import { shell } from 'electron';

// Open http(s) links in the user's browser; refuse every other scheme
// (file:, javascript:, custom protocols...).
export function openExternalSafely(url) {
  try {
    const { protocol } = new URL(url);
    if (protocol === 'https:' || protocol === 'http:') {
      shell.openExternal(url);
    }
  } catch {
    // Not a valid URL: ignore it.
  }
}

// Keep a window on the app's own pages: new windows and navigation to other
// sites are blocked, and web links open in the user's browser instead.
export function lockDownNavigation(window) {
  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternalSafely(url);
    return { action: 'deny' };
  });

  window.webContents.on('will-navigate', (event, url) => {
    const appOrigin = new URL(window.webContents.getURL()).origin;
    if (new URL(url).origin !== appOrigin) {
      event.preventDefault();
      openExternalSafely(url);
    }
  });
}
