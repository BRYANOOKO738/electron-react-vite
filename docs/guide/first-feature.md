# Your first feature

In this tutorial you build a small note editor that saves notes to a file the user chooses. It uses
every part of the template, so once it works you know the pattern for any feature: reading files,
showing dialogs, notifications and more.

**Time:** about 15 minutes. **You need:** the app running with `npm start`.

## What you will build

A text box and a **Save to file** button. Clicking the button opens the system's save dialog and
writes the note to the chosen file.

The page cannot write files itself (that would be unsafe), so the work is split across the four
folders you met in [Project structure](/guide/project-structure):

| Step | File                                     | Job                                |
| ---- | ---------------------------------------- | ---------------------------------- |
| 1    | `src/shared/ipc-channels.js`             | Give the request a name            |
| 2    | `src/main/ipc.js`                        | Show the dialog and write the file |
| 3    | `src/preload/preload.js`                 | Let the page ask for it            |
| 4    | `src/renderer/components/NoteEditor.jsx` | The text box and button            |
| 5    | `src/renderer/App.jsx`                   | Show the editor                    |

## 1. Name the request

Open `src/shared/ipc-channels.js` and add a `SAVE_NOTE` channel:

```js
// Names of the IPC channels between the main process and the preload script.
// Keeping them in one shared file means a typo becomes an import error
// instead of a message that silently never arrives.
export const IPC = {
  GET_APP_INFO: 'app:get-info',
  SAVE_NOTE: 'notes:save',
};
```

## 2. Do the work in the main process

The main process can use Node.js and Electron. Replace `src/main/ipc.js` with:

```js
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { writeFile } from 'node:fs/promises';
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

  ipcMain.handle(IPC.SAVE_NOTE, async (event, text) => {
    // Never trust data from the page: check it before using it.
    if (typeof text !== 'string') {
      throw new TypeError('The note must be text.');
    }

    // Ask the user where to save, attached to the window that asked.
    const window = BrowserWindow.fromWebContents(event.sender);
    const { canceled, filePath } = await dialog.showSaveDialog(window, {
      defaultPath: 'note.txt',
      filters: [{ name: 'Text files', extensions: ['txt'] }],
    });
    if (canceled || !filePath) {
      return { saved: false };
    }

    await writeFile(filePath, text, 'utf8');
    return { saved: true, filePath };
  });
}
```

::: tip Never trust the page
The handler checks that `text` really is text before writing it. Always validate what the page
sends: treat it like data from the internet.
:::

## 3. Let the page ask for it

Add a `saveNote` function to the bridge in `src/preload/preload.js`:

```js
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
  // Saves text to a file the user picks (handled in src/main/ipc.js).
  saveNote: (text) => ipcRenderer.invoke(IPC.SAVE_NOTE, text),
});
```

Saving `preload.js` reloads the window. Now the page can call `window.electronApp.saveNote(text)`,
and nothing else: it still has no direct access to files.

## 4. Build the editor

Create `src/renderer/components/NoteEditor.jsx`:

```jsx
import { useState } from 'react';

export default function NoteEditor() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const save = async () => {
    try {
      const result = await window.electronApp.saveNote(text);
      setStatus(result.saved ? `Saved to ${result.filePath}` : 'Not saved.');
    } catch (error) {
      setStatus(`Could not save: ${error.message}`);
    }
  };

  return (
    <section className="mx-auto max-w-xl space-y-3 p-6">
      <h2 className="text-xl font-semibold">Notes</h2>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={6}
        className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-900"
        placeholder="Write something..."
      />
      <button
        type="button"
        onClick={save}
        className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
      >
        Save to file
      </button>
      {status && <p className="text-sm text-slate-600 dark:text-slate-400">{status}</p>}
    </section>
  );
}
```

## 5. Show it

Add the editor to `src/renderer/App.jsx`:

```jsx
import NoteEditor from './components/NoteEditor';
import Welcome from './components/Welcome';

// The root component. Replace <Welcome /> with your own screens.
export default function App() {
  return (
    <>
      <Welcome />
      <NoteEditor />
    </>
  );
}
```

Save. The editor appears under the welcome screen. Type a note, click **Save to file**, choose a
place, and open the file to check it.

## 6. Test it (optional)

Create `tests/note.spec.js`. The test replaces the save dialog with a fixed path, so it runs without
anyone clicking:

```js
const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { appWindow, launchApp } = require('./helpers');

test('saves a note to the chosen file', async () => {
  const app = await launchApp();
  const window = await appWindow(app);

  // Pretend the user picked this file in the save dialog.
  const notePath = path.join(os.tmpdir(), `note-${Date.now()}.txt`);
  await app.evaluate(({ dialog }, filePath) => {
    dialog.showSaveDialog = async () => ({ canceled: false, filePath });
  }, notePath);

  await window.getByPlaceholder('Write something...').fill('Hello from my first feature');
  await window.getByRole('button', { name: 'Save to file' }).click();

  await expect(window.getByText(`Saved to ${notePath}`)).toBeVisible();
  expect(fs.readFileSync(notePath, 'utf8')).toBe('Hello from my first feature');

  await app.close();
});

test('refuses a note that is not text', async () => {
  const app = await launchApp();
  const window = await appWindow(app);

  const error = await window.evaluate(() =>
    window.electronApp.saveNote(42).catch((err) => err.message),
  );
  expect(error).toContain('The note must be text.');

  await app.close();
});
```

Run `npm test`. All tests should pass.

## What you learned

- The **page** asks; the **main process** does anything that touches the computer.
- The **preload** script decides exactly which requests the page may make.
- Channel names live in **one shared file**, so a typo becomes an import error.
- The main process **validates** everything the page sends.

Use the same steps for any feature. Browse the [Electron API docs](https://www.electronjs.org/docs/latest/api/app)
to see what the main process can do: menus, notifications, the clipboard, the system tray and more.
