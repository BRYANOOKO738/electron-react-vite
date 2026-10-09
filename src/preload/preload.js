// The preload script runs before the page loads. It is the only safe bridge
// between the page (src/renderer) and Electron (src/main).
// Expose only small, specific functions here; never expose ipcRenderer itself.
// https://www.electronjs.org/docs/latest/tutorial/context-isolation
import { contextBridge, ipcRenderer } from 'electron';
import { IPC } from '../shared/ipc-channels';

contextBridge.exposeInMainWorld('electronApp', {
  // Versions of the bundled runtimes, available in the page as window.electronApp.versions.
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  // Asks the main process for app details (handled in src/main/ipc.js).
  getAppInfo: () => ipcRenderer.invoke(IPC.GET_APP_INFO),
});
