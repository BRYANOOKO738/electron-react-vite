# Contributing

Thanks for helping improve electron-react-vite.

## Set up

```bash
git clone https://github.com/BRYANOOKO738/electron-react-vite.git
cd electron-react-vite
npm run setup
npm start
```

Use the Node.js version in `.nvmrc` (`nvm use`).

## Make a change

1. Create a branch: `git checkout -b fix/short-description`
2. Make your change.
3. Run `npm run check` and fix anything it reports (`npm run lint:fix` and `npm run format` help).
4. Check the app still starts with `npm start` and builds with `npm run package`.
5. Open a pull request and fill in the template. Give it a
   [Conventional Commits](https://www.conventionalcommits.org/) title, for example:
   - `feat: add a settings page` for a new feature
   - `fix: crash when saving an empty note` for a bug fix
   - `docs: explain how to change the icon` for documentation

   The **Pull Request Title** check confirms the format. You don't need to edit `CHANGELOG.md`:
   Release Please writes it from these titles and commit messages.

## Automated checks on your pull request

| Check              | What it does                                                      |
| ------------------ | ----------------------------------------------------------------- |
| CI                 | Lint, format, tests and installer builds on Windows, macOS, Linux |
| CodeQL             | Scans the code for security problems                              |
| Dependency Review  | Blocks new packages with known vulnerabilities                    |
| Pull Request Title | Checks the Conventional Commits title                             |
| Labeler            | Labels the pull request by the files it changes                   |
| Links              | Checks web links when docs change                                 |

## Documentation

The docs site lives in `docs/`. Preview it with `npm run docs:dev`.

## Code of conduct

Be respectful and constructive. This project follows the
[Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
Report unacceptable behaviour to [ookobryan8@gmail.com](mailto:ookobryan8@gmail.com).
