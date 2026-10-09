// Entry point of the Electron main process: starts the app and manages its lifecycle.
import { app, BrowserWindow } from 'electron';
import started from 'electron-squirrel-startup';
import { registerIpcHandlers } from './ipc';
import { createMainWindow } from './window';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow = null;

const openMainWindow = () => {
  mainWindow = createMainWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
    registerIpcHandlers();
    openMainWindow();

    // On macOS, re-create a window when the dock icon is clicked and none are open.
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        openMainWindow();
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
