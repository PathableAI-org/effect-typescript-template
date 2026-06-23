# effect-typescript-template

Pathable's template repository for open-source TypeScript projects built with Effect v3.

This repository is intentionally small. It gives new libraries, CLIs, backend services, integrations, and workflow-oriented tools a working Effect baseline with typed schemas, tagged errors, services, Layers, deterministic tests, package builds, release automation, and agent instructions.

## Intended Project Types

- reusable libraries;
- command-line applications;
- backend services;
- integrations;
- workflow-oriented tools.

## Use This Template

1. Click **Use this template** on GitHub.
2. Create your new repository.
3. Clone and install dependencies:

   ```sh
   pnpm install --frozen-lockfile
   ```

## Workspace Layout

- `packages/domain`: shared `Schema` models, branded identifiers, tagged errors, and HTTP API contracts.
- `packages/server`: service implementations, HTTP handlers, and the server composition root.
- `packages/cli`: CLI commands, HTTP client service, and the CLI composition root.
- `docs/architecture.md`: package boundaries and composition root guidance.
- `docs/effect-conventions.md`: Effect-specific development rules.
- `.agents/skills`: reusable agent instructions for recurring Effect tasks.
- `.github/workflows`: pull request checks, package snapshots, Fallow analysis, and release automation.

Importing a package must not start a server, run a CLI, or acquire live resources. Runtime execution belongs in `packages/server/src/server.ts` and `packages/cli/src/bin.ts`.

## Canonical Vertical Slice

The todo slice demonstrates:

- schema-backed domain models and branded IDs in `packages/domain/src/TodosApi.ts`;
- a serializable `TodoNotFound` tagged error;
- an Effect service backed by a live Layer in `packages/server/src/TodosRepository.ts`;
- HTTP API handlers built from the shared domain contract in `packages/server/src/Api.ts`;
- a CLI client that depends on services instead of hidden runtime work in `packages/cli/src/TodosClient.ts`;
- tests for service success and expected failure paths in `packages/server/test`.

## Commands

Run from the repository root:

```sh
pnpm codegen
pnpm check
pnpm lint
pnpm test
pnpm coverage
pnpm build
pnpm clean
```

Focused package checks:

```sh
pnpm --filter @template/domain test
pnpm --filter @template/server test
pnpm --filter @template/cli test
```

Before requesting review, run:

```sh
pnpm codegen
pnpm check
pnpm lint
pnpm test
pnpm build
pnpm exec fallow audit --base main --format json --quiet
```

## Adapting The Template

After creating a new repository from this template:

1. Rename package scopes from `@template/*` to the new project's package names.
2. Replace repository metadata in package manifests.
3. Keep the package boundaries unless the new project has a clear reason to simplify or split them.
4. Extend the todo slice or replace it with one complete vertical slice for the new domain.
5. Run `pnpm codegen` after adding or removing public source files.
6. Keep generated export files committed.

Use the root `AGENTS.md` and `.agents/skills` as the source of truth for agent-facing development conventions.

## Effect Guidance

This template targets the latest stable Effect v3 release recorded in `pnpm-lock.yaml`. Do not introduce Effect v4 APIs until the project explicitly adopts Effect v4.

Before implementing unfamiliar Effect patterns:

1. Inspect the closest local todo-slice example.
2. Check <https://www.effect.solutions/>.
3. Check <https://effect.website/>.
4. Confirm the API against the installed package types.

## Publishing

Packages are configured for public npm publishing through Changesets. Add a changeset for publishable API changes unless the change is explicitly exempt.

The default license is the Unlicense.
