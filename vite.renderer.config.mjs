import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Content-Security-Policy for the renderer.
// The dev server needs inline scripts (React Fast Refresh) and a WebSocket (HMR);
// the packaged app gets the strict policy.
const CSP = {
  serve: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self' ws://localhost:*",
  ].join('; '),
  build: [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; '),
};

const contentSecurityPolicy = (command) => ({
  name: 'content-security-policy',
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP[command] },
      injectTo: 'head-prepend', // must come before any <script> to protect it
    },
  ],
});

// https://vitejs.dev/config
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), contentSecurityPolicy(command)],
}));
