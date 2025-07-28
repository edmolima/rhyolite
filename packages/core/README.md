# @rhyolite/core

Rhyolite Core Library

## Sobre

Este pacote fornece funcionalidades centrais reutilizáveis para outros projetos do monorepo, como o CLI.

## Como usar

Instale via workspace:

```sh
pnpm add @rhyolite/core
```

Importe e use:

```ts
import { hello } from '@rhyolite/core';
console.log(hello('dev'));
```

## Scripts

- `pnpm build` — Compila o core para dist/
- `pnpm lint` — Lint nos arquivos TypeScript
- `pnpm format` — Formata o código
- `pnpm test` — Testes (placeholder)
- `pnpm clean` — Remove dist/

## Desenvolvimento

- Edite o código em `src/`
- Rode `pnpm build` para compilar
- Rode `pnpm lint` e `pnpm format` para manter o padrão

## License

MIT
