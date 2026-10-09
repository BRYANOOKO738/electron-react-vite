# Building and releasing

## Build installers locally

```bash
npm run make
```

Installers are written to `out/make/`. Each operating system builds its own installers:

| System  | Output                     |
| ------- | -------------------------- |
| Windows | `Setup.exe` (Squirrel)     |
| macOS   | `.zip`                     |
| Linux   | `.deb` and `.rpm` packages |

On Linux, `.deb` needs `dpkg` and `fakeroot`, and `.rpm` needs `rpm`.

## Publish a release

Releases are built and uploaded by GitHub Actions.

```bash
npm version patch   # or minor / major: updates package.json and creates a vX.Y.Z tag
git push --follow-tags
```

The **Release** workflow then builds installers on Windows, macOS and Linux and attaches them to a
draft GitHub release. Review the draft, edit the notes, and publish it.
