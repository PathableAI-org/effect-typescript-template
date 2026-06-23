# Add CLI Command

Use this skill before adding or changing a CLI command.

## Checklist

- Start from `packages/cli/src/Cli.ts`, `packages/cli/src/TodosClient.ts`, and `packages/cli/src/bin.ts`.
- Define command arguments and options with `@effect/cli` schemas instead of ad hoc parsing.
- Keep command handlers as Effects and put HTTP or other external access behind services.
- Keep runtime execution in `packages/cli/src/bin.ts`; importing CLI modules must not run the command.
- Avoid logging user-provided text or secrets; prefer identifiers, counts, and operation names.
- Add tests for command-level behavior or the underlying client/workflow behavior.
- If the CLI API is unfamiliar, check <https://www.effect.solutions/> and <https://effect.website/> against the installed package types.
