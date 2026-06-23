# AGENTS.md

This repository is Pathable's template for open-source TypeScript projects built with Effect.

Keep this file concise and update it when repository structure, commands, or conventions change.

## Project Purpose

This template provides a small starting point for:

- reusable libraries;
- command-line applications;
- backend services;
- integrations;
- workflow-oriented tools.

Prefer explicit schemas, typed errors, visible service requirements, deterministic tests, and examples that coding agents can safely imitate.

This repository targets the latest stable Effect v3 release. Do not introduce Effect v4 APIs until the project explicitly adopts Effect v4.

## Repository Structure

- `packages/domain`: Schemas, domain models, tagged errors, and shared API contracts.
- `packages/server`: Server services, adapters, HTTP handlers, and runtime composition.
- `packages/cli`: CLI commands, client services, and the CLI executable.
- `.agents/skills`: Reusable instructions for common Effect development tasks.
- `scripts`: Repository maintenance and validation scripts.
- `.github/workflows`: Pull request, snapshot, and release automation.
- `scratchpad`: Local experiments that are not part of the published API.

Executable entrypoints:

- `packages/cli/src/bin.ts`
- `packages/server/src/server.ts`

Importing a package must not execute a CLI, start a server, or acquire live resources.

## Architecture Rules

- Validate untrusted and serialized data with `Schema`.
- Represent expected failures as tagged, serializable errors.
- Put external systems behind Effect services.
- Keep domain types and service contracts independent of live infrastructure.
- Provide separate live and test Layers for services.
- Keep internal Layer composition within the package or feature that owns it.
- Compose published feature Layers at one application composition root.
- Keep runtime execution in executable entrypoints.
- Use scoped resource management for acquired resources.
- Use `Config` and `Redacted` for configuration and secrets.
- Name important operations with `Effect.fn` when it improves tracing.
- Use Effects instead of Promise-based service contracts.
- Use defects only for unexpected, unrecoverable failures.
- Avoid `any`, unchecked casts, floating Effects, and hidden requirements.
- Do not put Effect into browser-critical code without measurements.

Before introducing an abstraction, look for an existing local example that can be extended.

## Effect Guidance

Do not rely on model memory for Effect APIs.

Before implementing an unfamiliar Effect pattern:

1. Inspect the closest local example.
2. Consult version-matched guidance at <https://www.effect.solutions/>.
3. Consult the official documentation at <https://effect.website/>.
4. Confirm the API against the installed package types.

Prefer patterns compatible with the versions recorded in `pnpm-lock.yaml`.

## Agent Skills

Consult the corresponding instructions in `.agents/skills` before:

- adding a Schema model;
- adding a tagged error;
- adding a service or Layer;
- adding a workflow;
- adding a CLI command.

Scoped `AGENTS.md` files may add package-specific rules, but they must not repeat or contradict this file.

## Commands

Run commands from the repository root.

- Install: `pnpm install --frozen-lockfile`
- Generate exports: `pnpm codegen`
- Typecheck: `pnpm check`
- Lint and formatting check: `pnpm lint`
- Apply lint and formatting fixes: `pnpm lint-fix`
- Test: `pnpm test`
- Coverage: `pnpm coverage`
- Build packages: `pnpm build`
- Clean generated output: `pnpm clean`

Use package filters for focused work:

    pnpm --filter @template/domain test
    pnpm --filter @template/server test
    pnpm --filter @template/cli test

Run the complete validation suite before requesting review:

    pnpm codegen
    pnpm check
    pnpm lint
    pnpm test
    pnpm build
    pnpm exec fallow audit --format json --quiet

After code generation, confirm that generated source changes are committed.

## Testing Rules

- Use `@effect/vitest` for Effect programs.
- Test service logic with test Layers instead of live infrastructure.
- Cover every tagged-error path introduced by a change.
- Use deterministic clocks and controlled services for time-dependent behavior.
- Test Schema decoding at system boundaries.
- Keep fixtures and examples synthetic.
- Documentation examples must compile or execute as tests.
- Add type-level tests when runtime tests cannot verify the contract.

Placeholder tests do not count as coverage for new behavior.

## Logging And Sensitive Data

The template's defaults may be reused in sensitive applications.

- Do not log request bodies, record contents, secrets, or user-provided text.
- Prefer identifiers, counts, operation names, and non-sensitive metadata.
- Store secrets with `Config.redacted` or an equivalent `Redacted` value.
- Never commit credentials, production data, or private logs.
- Review error causes before exposing them through HTTP or CLI output.

## Package And Publishing Rules

- Use explicit package exports generated through repository tooling.
- Do not manually edit generated export files.
- Keep package metadata, repository URLs, licenses, and publish settings valid.
- Add a Changeset for changes to a publishable package unless explicitly exempt.
- Keep Effect ecosystem dependencies compatible and update them as a group.
- Effect dependency updates require review and must not auto-merge.
- Do not change the repository license without an explicit project decision.

## Fallow

Use Fallow as a repository-analysis aid, not as a substitute for understanding the code.

- Run `fallow audit --format json --quiet` before committing AI-generated changes.
- Use `fallow dead-code --format json --quiet` before removing unused code.
- Use `fallow dupes --format json --quiet` before consolidating duplication.
- Use `fallow health --format json --quiet` to identify architectural hotspots.
- Verify recommendations against exports, generated code, entrypoints, and Layer composition.

<!-- generated:task-matrix:start -->
| When the agent is about to... | Run |
|---|---|
| delete an "unused" export or file | `fallow dead-code --trace <file>:<export>` |
| delete an "unused" dependency | `fallow dead-code --trace-dependency <name>` |
| commit or open a PR | `fallow audit --base <ref>` |
| prioritize refactoring | `fallow health --hotspots --targets` |
| ask who owns code | `fallow health --ownership` |
| check untested-but-reachable code | `fallow health --coverage-gaps` |
| consolidate duplication | `fallow dupes --trace dup:<fingerprint>` |
| find feature flags | `fallow flags` |
| surface security candidates | `fallow security` |
| understand a finding | `fallow explain <issue-type>` |
| scope a monorepo | `--workspace <glob> / --changed-workspaces <ref>` |
<!-- generated:task-matrix:end -->

## Change Discipline

- Keep changes focused on the requested behavior.
- Preserve existing package boundaries unless the task changes the architecture.
- Do not edit generated, vendored, or lockfile content manually.
- Do not add dependencies when an installed dependency already solves the problem.
- Do not hide type errors with casts or weaker compiler settings.
- Do not leave placeholders in executable, publishing, or CI configuration.
- Update documentation when commands, boundaries, or public behavior change.
- Record unresolved architectural questions instead of inventing conventions.

## Completion Checklist

Before declaring work complete:

- relevant behavior has focused tests;
- expected failures remain in the typed error channel;
- live infrastructure is isolated behind services and Layers;
- imports do not trigger runtime side effects;
- generated exports are current;
- documentation and examples remain accurate;
- no sensitive content is logged;
- typecheck, lint, tests, build, and Fallow checks pass;
- publishable changes include an appropriate Changeset.

## Cursor Cloud specific instructions

Standard commands are in `## Commands` above; install/lint/test/build run unchanged. Notes below are the non-obvious runtime gotchas.

- Toolchain: pnpm (`11.8.0`, pinned via `packageManager`) is preinstalled and the repo builds, tests, and runs on the preinstalled Node (22.x). CI pins Node `24.5.0` (`.github/actions/setup/action.yml`); no version switch is needed for local dev.
- End-to-end flow needs two pieces: start the server first with `pnpm --filter @template/server dev` (HTTP API on `http://localhost:3000`), then drive it with the CLI. The CLI client base URL is hardcoded to `http://localhost:3000` (`packages/cli/src/TodosClient.ts`), so the server must be up.
- Running the CLI for one-shot commands: do NOT use `pnpm --filter @template/cli dev` for scripted/single commands — its `dev` script is `tsx --watch`, which never exits. Run one-shot commands with `pnpm --filter @template/cli exec tsx src/bin.ts <add|list|done|remove> ...` (or the built binary). Use `dev` only for an interactive watch loop.
- The CLI logs only operation names/counts, not record contents (a deliberate logging policy). To inspect actual todo data, query the API directly, e.g. `curl http://localhost:3000/todos`.
- Server state is in-memory (`TodosRepository`); restarting the server clears all todos. No database or external services are required.
