# Effect Conventions

Use these conventions for all template changes:

- Validate untrusted and serialized data with `Schema`.
- Represent expected failures as tagged, serializable errors.
- Keep external systems behind Effect services.
- Provide separate live and test Layers for services.
- Keep runtime execution in executable entrypoints only.
- Use `Config` + `Redacted` for secrets.
- Prefer `Effect.fn` for named workflows and key operations.
- Test Effect programs with `@effect/vitest` and deterministic dependencies.
- Avoid `any`, unchecked casts, floating Effects, and Promise-based service contracts.

Before implementing unfamiliar Effect APIs:

1. inspect the closest local example;
2. check <https://www.effect.solutions/>;
3. check <https://effect.website/>;
4. confirm against installed package types.
