# create-rhyolite

[![npm version](https://img.shields.io/npm/v/create-rhyolite.svg)](https://www.npmjs.com/package/create-rhyolite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

> create next-generation Obsidian plugins and themes with ease.

---

## 🚀 Quick Start

```sh
# create a new plugin from an official template
npm create rhyolite@latest my-plugin -- --plugin react

# create a new theme from an official template
npm create rhyolite@latest my-theme -- --theme vue

# create from any community template by name
npm create rhyolite@latest my-cool-thing -- --plugin my-custom-template
```

## ✨ Features
- Official and community templates for plugins and themes
- TypeScript-first, blazing fast, and easy to extend
- Friendly CLI with interactive and command modes
- Colorful output and rich help

## 📦 Local Development

1. Clone the repository
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Build the CLI:
   ```sh
   pnpm --filter create-rhyolite run build
   ```
4. Run the CLI locally:
   ```sh
   node dist/index.js --help
   ```

## 🛠️ Usage

Run the CLI for help and onboarding tips:

```sh
pnpm exec create-rhyolite --help
```

## 🧩 Template Authoring

Anyone can contribute a template! See the main [README](../../README.md) for details.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md).

## 🛡️ Security

See [SECURITY.md](../../SECURITY.md).

## 📄 License

MIT
