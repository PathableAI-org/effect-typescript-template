# Add Tagged Error

Use this skill before adding an expected failure mode.

## Checklist

- Start from `TodoNotFound` in `packages/domain/src/TodosApi.ts`.
- Represent expected failures as serializable tagged errors, usually `Schema.TaggedError`.
- Include only non-sensitive identifiers or metadata in error payloads.
- Add errors to API endpoint contracts with explicit HTTP status mapping when exposed over HTTP.
- Keep defects for unexpected, unrecoverable failures only.
- Cover every new tagged-error path with focused tests using `Effect.flip` or tag-specific handling.
- If the Effect error API is unfamiliar, check <https://www.effect.solutions/> and <https://effect.website/> against the installed package types.
