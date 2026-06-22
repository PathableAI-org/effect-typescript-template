# effect-typescript-template

Pathable's template repository for open-source TypeScript projects built with Effect v3.

## Intended project types

- reusable libraries;
- command-line applications;
- backend services;
- integrations;
- workflow-oriented tools.

## Use this template

1. Click **Use this template** on GitHub.
2. Create your new repository.
3. Clone and install dependencies:

   ```sh
   pnpm install --frozen-lockfile
   ```

## Workspace layout

- `packages/domain`: Schemas, tagged errors, and shared contracts.
- `packages/server`: HTTP handlers, services, and runtime composition.
- `packages/cli`: CLI commands and runtime entrypoint.
- `docs/architecture.md`: package boundaries and composition root guidance.
- `docs/effect-conventions.md`: Effect-specific development rules.
- `.agents/skills`: reusable agent instructions for recurring Effect tasks.

## Commands

Run from repository root:

- `pnpm codegen`
- `pnpm check`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm exec fallow audit --format json --quiet`

## Canonical vertical slice

The todo slice demonstrates:

- Schema models and tagged errors in `packages/domain/src/TodosApi.ts`;
- service contract + live/test Layers in `packages/server/src/MessageWorkflow.ts`;
- workflow function in `packages/server/src/TodoWorkflow.ts`;
- tests using live and test Layers in `packages/server/test`.