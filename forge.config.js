const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    // Must match package.json "name": the Linux deb/rpm makers look for this binary.
    executableName: 'electron-react-vite',
    // App icon without extension: icon.icns is used on macOS, icon.ico on Windows.
    icon: 'assets/icons/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: 'assets/icons/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Bryan Onyango <ookobryan8@gmail.com>',
          icon: 'assets/icons/icon.png',
          homepage: 'https://bryanooko738.github.io/electron-react-vite/',
          categories: ['Development'],
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          homepage: 'https://bryanooko738.github.io/electron-react-vite/',
          categories: ['Development'],
          icon: 'assets/icons/icon.png',
        },
      },
    },
  ],
  publishers: [
    {
      // Uploads the installers from `npm run publish` to a GitHub release.
      // Needs a GITHUB_TOKEN environment variable (set automatically in GitHub Actions).
      name: '@electron-forge/publisher-github',
      config: {
        repository: { owner: 'BRYANOOKO738', name: 'electron-react-vite' },
        draft: true,
        generateReleaseNotes: true,
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: 'src/main/main.js',
            config: 'vite.main.config.mjs',
            target: 'main',
          },
          {
            entry: 'src/preload/preload.js',
            config: 'vite.preload.config.mjs',
            target: 'preload',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
