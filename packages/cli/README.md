
# @rhyolite/cli

Rhyolite CLI

## About

This package is the CLI for the Rhyolite monorepo. All command parsing and CLI logic lives here. The core package only provides business rules and utilities.

## Usage

### Create a plugin or theme

```sh
npm create rhyolite@latest my-plugin -- --plugin typescript-plugin
npm create rhyolite@latest my-theme -- --theme typescript-theme
```

The CLI will print:
- `plugin created` for plugins
- `theme created` for themes

### Local execution (after build)

```sh
node dist/index.js my-plugin -- --plugin typescript-plugin
node dist/index.js my-theme -- --theme typescript-theme
```

Or install globally:

```sh
pnpm build
pnpm link --global
rhyolite my-plugin -- --plugin typescript-plugin
```

## Scripts

- `pnpm build` — Compiles the CLI to dist/
- `pnpm lint` — Lints TypeScript files
- `pnpm format` — Formats the code
- `pnpm test` — Tests (placeholder)
- `pnpm clean` — Removes dist/

## Development

- Edit code in `src/`
- Run `pnpm build` to compile
- Run `pnpm lint` and `pnpm format` to keep code style

## Dependencies

- Uses the `@rhyolite/core` package from the monorepo

## License

MIT
