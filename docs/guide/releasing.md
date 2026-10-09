# Building and releasing

## Try the packaged app

```bash
npm run package
```

This builds the app into `out/` without an installer. Open it to check it works the way users
will see it: DevTools stays closed and the app loads from files.

## Build installers

```bash
npm run make
```

Installers are written to `out/make/`. Each system builds its own:

| Built on | Installers                                                     |
| -------- | -------------------------------------------------------------- |
| Windows  | `Setup.exe`                                                    |
| macOS    | `.zip` (add `-- --arch=arm64,x64` for Apple Silicon and Intel) |
| Linux    | `.deb` and `.rpm` (needs `fakeroot`, `dpkg` and `rpm`)         |

You don't need all three computers: the release workflow below builds on all of them for you.

## Publish a release

Releases are automatic with [Release Please](https://github.com/googleapis/release-please):

1. Give pull requests [Conventional Commits](https://www.conventionalcommits.org/) titles:
   `feat: …` for features (next minor version), `fix: …` for bug fixes (next patch version).
2. After each merge, Release Please updates a pull request called
   **"chore(main): release x.y.z"** with the new version number and the changelog.
3. When you are ready to release, merge that pull request. Release Please creates the tag and the
   GitHub release, then the **Release** workflow tests the app on Windows, macOS and Linux and
   uploads the installers to it (about 10 minutes).

The installers then appear on the [download page](/download).

::: details Releasing by hand
You can still release without Release Please:

```bash
npm version patch   # 1.0.0 → 1.0.1; use minor or major for bigger changes
git push --follow-tags
```

This creates a **draft** release: open **Releases**, check it and click **Publish release**.
:::

## Code signing

Without code signing, Windows SmartScreen and macOS Gatekeeper warn users when they open your app.
To remove the warnings you need:

- **macOS:** an Apple Developer account, then `osxSign` and `osxNotarize` in `forge.config.js`.
  See [Signing a macOS app](https://www.electronforge.io/guides/code-signing/code-signing-macos).
- **Windows:** a code-signing certificate, then the `windowsSign` options. See
  [Signing a Windows app](https://www.electronforge.io/guides/code-signing/code-signing-windows).

Store certificates and passwords as GitHub Actions secrets, never in the repository.
