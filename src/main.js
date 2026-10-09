import { app, BrowserWindow, ipcMain, nativeTheme, shell } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const isDev = !app.isPackaged;
let mainWindow = null;

// Open http(s) links in the user's browser; refuse every other scheme.
const openExternalSafely = (url) => {
  try {
    const { protocol } = new URL(url);
    if (protocol === 'https:' || protocol === 'http:') {
      shell.openExternal(url);
    }
  } catch {
    // Not a valid URL: ignore it.
  }
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    minWidth: 480,
    minHeight: 360,
    show: false, // shown on 'ready-to-show' to avoid a white flash
    // Match the page background so there is no flash before it paints.
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#020617' : '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Never let the app window navigate away from the app or open new windows.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternalSafely(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const appUrl = mainWindow.webContents.getURL();
    if (new URL(url).origin !== new URL(appUrl).origin) {
      event.preventDefault();
      openExternalSafely(url);
    }
  });

  // Recover from a crashed or killed renderer instead of leaving a blank window.
  mainWindow.webContents.on('render-process-gone', (_event, details) => {
    console.error('Renderer process gone:', details.reason);
    if (details.reason !== 'clean-exit') {
      mainWindow.reload();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // DevTools only while developing, never in the packaged app.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

// Allow only one running copy; a second launch focuses the existing window.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    // Answers window.electronApp.getAppInfo() from the preload script.
    ipcMain.handle('app:get-info', () => ({
      name: app.getName(),
      version: app.getVersion(),
      platform: process.platform,
    }));

    createWindow();

    // On macOS, re-create a window when the dock icon is clicked and none are open.
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
}

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception in main process:', error);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection in main process:', reason);
});
