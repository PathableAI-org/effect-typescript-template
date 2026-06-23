# Add Workflow

Use this skill before adding reusable business logic that coordinates schemas, services, and errors.

## Checklist

- Place reusable workflows in the package that owns the feature; keep executable runtime wiring out of workflow modules.
- Start from the todo slice and preserve its separation: domain contracts in `packages/domain`, service implementation in `packages/server`, command/client orchestration in `packages/cli`.
- Make service requirements visible in the Effect environment instead of hidden imports or module-level singletons.
- Prefer `Effect.fn` for important named operations when it improves traces.
- Keep expected failures in the typed error channel and map them at the boundary that exposes them.
- Add deterministic tests for success, expected failure, and boundary decoding when applicable.
- If the workflow uses an unfamiliar Effect pattern, check <https://www.effect.solutions/> and <https://effect.website/> against the installed package types.
