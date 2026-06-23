# Add CLI Command

1. Define arguments/options with `@effect/cli` schemas.
2. Keep command handlers thin and delegate business logic to workflows/services.
3. Avoid logging user-provided bodies; log IDs/counts and operation names only.
4. Cover command behavior with tests using test Layers for dependencies.
