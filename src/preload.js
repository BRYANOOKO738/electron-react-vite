// The preload script runs before the page loads. It is the only safe bridge
// between the page (renderer) and Electron (main process).
// Expose only small, specific functions here; never expose ipcRenderer itself.
// https://www.electronjs.org/docs/latest/tutorial/context-isolation
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronApp', {
  // Versions of the bundled runtimes, available in the page as window.electronApp.versions.
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  // Asks the main process for app details (handled by ipcMain.handle in main.js).
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
});
