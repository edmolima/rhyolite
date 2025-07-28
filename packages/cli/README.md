# @rhyolite/cli

Rhyolite CLI

## Sobre

Este pacote é o CLI do monorepo Rhyolite. Ele utiliza o core para executar comandos e pode ser usado via linha de comando.

## Como usar

Após build, rode:

```sh
npx rhyolite [nome]
```

Ou instale globalmente:

```sh
pnpm build
pnpm link --global
rhyolite [nome]
```

## Scripts

- `pnpm build` — Compila o CLI para dist/
- `pnpm lint` — Lint nos arquivos TypeScript
- `pnpm format` — Formata o código
- `pnpm test` — Testes (placeholder)
- `pnpm clean` — Remove dist/

## Desenvolvimento

- Edite o código em `src/`
- Rode `pnpm build` para compilar
- Rode `pnpm lint` e `pnpm format` para manter o padrão

## Dependências

- Usa o pacote `@rhyolite/core` do monorepo

## License

MIT
