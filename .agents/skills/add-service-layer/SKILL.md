# Add Service And Layer

Use this skill before adding a service contract, live Layer, or test Layer.

## Checklist

- Start from `packages/server/src/TodosRepository.ts` for the service pattern and `packages/server/src/server.ts` for application composition.
- Put external systems behind Effect services; service methods should return `Effect`, not `Promise`.
- Keep domain types and service contracts independent of live infrastructure.
- Provide live and test Layers when behavior depends on state, IO, time, network, storage, or configuration.
- Keep internal Layer composition inside the package or feature that owns it.
- Compose published feature Layers only at an executable composition root.
- Use scoped resources for acquired resources, and use `Config` / `Redacted` for configuration and secrets.
- Test service behavior with test Layers and deterministic fixtures.
