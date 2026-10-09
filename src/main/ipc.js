import { app, ipcMain } from 'electron';
import { IPC } from '../shared/ipc-channels';

// Handlers for requests from the page. Each one is exposed to React by a
// matching function in src/preload/preload.js.
// To add a feature: add a channel name in src/shared/ipc-channels.js,
// handle it here, then expose it in the preload script.
export function registerIpcHandlers() {
  ipcMain.handle(IPC.GET_APP_INFO, () => ({
    name: app.getName(),
    version: app.getVersion(),
    platform: process.platform,
  }));
}
