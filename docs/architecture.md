# Architecture

## Package boundaries

- `@template/domain`: shared schemas, tagged errors, and API contracts only.
- `@template/server`: infrastructure-backed services, HTTP handlers, and server runtime.
- `@template/cli`: command definitions and client runtime.

## Composition root

- `packages/server/src/server.ts` is the server composition root.
- `packages/cli/src/bin.ts` is the CLI composition root.
- Importing package entrypoints must not launch runtimes or acquire live resources.

## Canonical vertical slice

The todo slice is the canonical example to copy for new features:

1. **Contract and data types** in `packages/domain/src/TodosApi.ts`.
2. **Service contract + live/test Layers** in `packages/server/src/MessageWorkflow.ts`.
3. **Workflow** in `packages/server/src/TodoWorkflow.ts`.
4. **Runtime wiring** in `packages/server/src/Api.ts` and `packages/server/src/server.ts`.
5. **Tests** in `packages/server/test`.
