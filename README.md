# rhyolite

[![Build Status](https://github.com/edmolima/rhyolite/actions/workflows/publish.yml/badge.svg)](https://github.com/edmolima/rhyolite/actions)
[![npm version](https://img.shields.io/npm/v/create-rhyolite.svg)](https://www.npmjs.com/package/create-rhyolite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **rhyolite**: Create next generation Obsidian plugins and themes with a single command.

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

- Official and community templates for plugins and themes
- TypeScript-first, blazing fast, and easy to extend
- Friendly CLI with interactive and command modes
- Colorful output and rich help

## 📦 Monorepo Structure

- `packages/create-rhyolite`: The CLI tool
- `packages/themes`: Official theme templates
- `packages/plugin`: Official plugin templates
- `packages/.../community`: Community-contributed templates

## 📖 Usage

Run the CLI for help and onboarding tips:

```sh
pnpm exec create-rhyolite --help
```

## 🛠️ Local Development

1. Clone the repository
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Build all packages:
   ```sh
   pnpm build
   ```
4. Run/test individual packages as needed

## 🧩 Template Authoring

Anyone can contribute a template! See the [template authoring guide](./docs/template-authoring.md) for details.

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
