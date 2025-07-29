
# rhyolite

[![Build Status](https://github.com/edmolima/rhyolite/actions/workflows/publish.yml/badge.svg)](https://github.com/edmolima/rhyolite/actions)
[![npm version](https://img.shields.io/npm/v/create-rhyolite.svg)](https://www.npmjs.com/package/create-rhyolite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Creating next generation Obsidian plugins and themes.

---


## 🚀 Quick Start

```sh
# Scaffold a new plugin from an official template
npm create rhyolite@latest my-plugin -- --plugin react

# Scaffold a new theme from an official template
npm create rhyolite@latest my-theme -- --theme vue

# Scaffold from any community template by name
npm create rhyolite@latest my-cool-thing -- --plugin my-custom-template
```



## ✨ Features

- Discover and use both official and community templates for plugins and themes
- Templates are simple JSON descriptors (e.g., `packages/themes|plugin/community/templateName.json`) that point to a GitHub repository
- Download and scaffold from any template instantly, directly from the CLI
- Anyone can contribute a template—just publish a `packages/themes|plugin/community/templateName.json` with a GitHub link!
- Official templates for React, Vue, Svelte, and Solid (maintained in `packages/themes` and `packages/plugin`)
- TypeScript-first, blazing fast builds, and easy to extend

## 📦 About

**rhyolite** is a next-generation monorepo and CLI for building Obsidian plugins and themes.

### How does the template marketplace work?

- **Official templates** are maintained in this repository under `packages/themes` and `packages/plugin`.
- **Community templates** can be registered by anyone—just publish a `templateName.json` file with a link to your GitHub repository.
- When you run the CLI, you can pick any template by name. The CLI fetches the template’s repository and scaffolds your project instantly.

#### Example of a community template:

```json
{
  "name": "my-custom-template",
  "description": "A cool starter for X",
  "repo": "https://github.com/username/repo"
}
```

### Available official templates:
- `react`
- `vue`
- `svelte`
- `solid`


## 📖 Usage

See the [Quick Start](#-quick-start) above or run:

```sh
npm create rhyolite@latest --help
```

## 🛠️ Development

1. Clone the repository
2. Install dependencies with your preferred package manager (e.g., pnpm, npm, yarn)
3. Build all packages:
   ```sh
   pnpm build
   ```
4. Run/test individual packages as needed

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## 🚢 CI/CD: Publishing to npm

This project uses GitHub Actions to automatically publish to npm when a new version tag is pushed.  
See [.github/workflows/publish.yml](.github/workflows/publish.yml).

## 🛡️ Security

See [SECURITY.md](SECURITY.md) for security policy and vulnerability reporting.

## 💬 Community & Support

- [Discussions](https://github.com/edmolima/rhyolite/discussions)
- [Issues](https://github.com/edmolima/rhyolite/issues)

## 💸 Funding

Support this project via the platforms listed in [.github/FUNDING.yml](.github/FUNDING.yml).

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
