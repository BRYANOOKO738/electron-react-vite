import { defineConfig } from 'vitepress';

const repo = 'https://github.com/BRYANOOKO738/electron-react-vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'electron-react-vite',
  description:
    'A secure, ready-to-ship desktop app template with Electron, React, Vite and Tailwind CSS.',
  // GitHub Pages serves the site at https://bryanooko738.github.io/electron-react-vite/
  base: '/electron-react-vite/',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Download', link: '/download' },
      { text: 'Changelog', link: `${repo}/blob/main/CHANGELOG.md` },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Project structure', link: '/guide/project-structure' },
          { text: 'Security', link: '/guide/security' },
          { text: 'Building and releasing', link: '/guide/releasing' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: repo }],
    editLink: {
      pattern: `${repo}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Bryan Onyango',
    },
  },
});
