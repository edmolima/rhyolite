# rhyolite

Creating next generation obsidian plugins and themes.

## Table of Contents
- [rhyolite](#rhyolite)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Changelog](#changelog)
  - [CI/CD: Publishing to npm](#cicd-publishing-to-npm)
  - [Security](#security)
  - [Funding](#funding)
  - [License](#license)

rhyolite is a modern project designed for reliability and maintainability.

## About

rhyolite is a modern monorepo where **each package is fully independent**. Every package has its own `package.json`, `tsconfig.json`, scripts, dependencies, and build process. The root only manages workspace-wide tooling and utilities.

**Best practices:**
- Add new packages in `packages/` with their own configs and dependencies
- Use `pnpm` for workspace management, but keep each package self-contained
- Lint, format, and test can be run per package or from the root using workspace scripts

## Getting Started

1. Clone the repository
2. Install dependencies with your preferred package manager (e.g., pnpm, npm, yarn)
3. Start building!

## Usage

Add usage instructions here.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.


## CI/CD: Publishing to npm

This project uses GitHub Actions to automatically publish to npm when a new version tag is pushed.

**To enable publishing:**
- Go to your repository on GitHub
- Click on Settings > Secrets and variables > Actions
- Add a new secret named `NPM_TOKEN` with your npm access token

The workflow is defined in [.github/workflows/publish.yml](.github/workflows/publish.yml).

## Security

See [SECURITY.md](SECURITY.md) for security policy and vulnerability reporting.

## Funding

Support this project via the platforms listed in [.github/FUNDING.yml](.github/FUNDING.yml).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
