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

1. Update `CHANGELOG.md`.
2. Bump the version and push the tag:

   ```bash
   npm version patch   # 1.0.0 → 1.0.1; use minor or major for bigger changes
   git push --follow-tags
   ```

3. On GitHub, open **Actions → Release** and wait for it to finish (about 10 minutes). It runs the
   tests on Windows, macOS and Linux, then uploads the installers to a **draft** release.
4. Open **Releases**, check the draft and its notes, and click **Publish release**.

Once published, the installers appear on the [download page](/download).

::: tip Draft releases are private
Nobody else can see a draft. If the download page shows nothing, the release is probably still
a draft.
:::

## Code signing

Without code signing, Windows SmartScreen and macOS Gatekeeper warn users when they open your app.
To remove the warnings you need:

- **macOS:** an Apple Developer account, then `osxSign` and `osxNotarize` in `forge.config.js`.
  See [Signing a macOS app](https://www.electronforge.io/guides/code-signing/code-signing-macos).
- **Windows:** a code-signing certificate, then the `windowsSign` options. See
  [Signing a Windows app](https://www.electronforge.io/guides/code-signing/code-signing-windows).

Store certificates and passwords as GitHub Actions secrets, never in the repository.
