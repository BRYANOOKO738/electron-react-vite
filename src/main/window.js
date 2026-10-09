import { app, BrowserWindow, nativeTheme } from 'electron';
import path from 'node:path';
import { lockDownNavigation } from './security';

// Creates the main app window with secure defaults.
export function createMainWindow() {
  const window = new BrowserWindow({
    width: 1024,
    height: 700,
    minWidth: 480,
    minHeight: 360,
    show: false, // shown on 'ready-to-show' to avoid a white flash
    // Match the page background so there is no flash before it paints.
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#020617' : '#ffffff',
    webPreferences: {
      // Built from src/preload/preload.js into the same folder as this file.
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  window.once('ready-to-show', () => window.show());
  lockDownNavigation(window);

  // Recover from a crashed or killed renderer instead of leaving a blank window.
  window.webContents.on('render-process-gone', (_event, details) => {
    console.error('Renderer process gone:', details.reason);
    if (details.reason !== 'clean-exit' && !window.isDestroyed()) {
      window.reload();
    }
  });

  // In development, load the Vite dev server (hot reload); in the packaged app, the built files.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // DevTools only while developing, never in the packaged app.
  if (!app.isPackaged) {
    window.webContents.openDevTools({ mode: 'detach' });
  }

  return window;
}
