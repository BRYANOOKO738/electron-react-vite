# Project structure

```text
src/
├── Components/
│   ├── ErrorBoundary.jsx   # Recovery screen if a component crashes
│   └── Welcome.jsx         # The first screen: replace it with your UI
├── index.css               # Tailwind import and base styles
├── main.js                 # Electron main process
├── preload.js              # Safe bridge between main and renderer
└── renderer.jsx            # React entry point
tests/
└── app.spec.js             # End-to-end tests that start the real app
docs/                       # This documentation site (VitePress)
```

## The three parts of an Electron app

- **Main process** (`src/main.js`) runs Node.js. It creates the window and controls the app's lifecycle.
- **Renderer process** (`index.html` and `src/renderer.jsx`) is the web page inside the window. It has
  no access to Node.js.
- **Preload script** (`src/preload.js`) runs before the page loads. It is the only safe place to
  expose main-process features to the page, through `contextBridge`.

## Calling the main process from React (IPC)

The template already contains a working example. The welcome screen shows the app's name and
version, which it gets from the main process:

```js
// src/main.js: answer the request
ipcMain.handle('app:get-info', () => ({
  name: app.getName(),
  version: app.getVersion(),
  platform: process.platform,
}));
```

```js
// src/preload.js: expose one small function to the page
contextBridge.exposeInMainWorld('electronApp', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
});
```

```jsx
// src/Components/Welcome.jsx: call it from React
useEffect(() => {
  window.electronApp?.getAppInfo().then(setAppInfo);
}, []);
```

To add your own feature, follow the same three steps: handle a channel in `main.js`, expose a
function for it in `preload.js`, and call that function from your component.

::: tip
Expose small, specific functions. Never expose `ipcRenderer` itself to the page: any script running
in the page could then send any message to the main process.
:::
