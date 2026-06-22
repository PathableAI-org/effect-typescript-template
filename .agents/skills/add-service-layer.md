# Add Service and Layers

1. Define service contracts with `Effect.Service` or `Context.Tag`.
2. Keep service contracts independent from infrastructure details.
3. Provide a live Layer for production wiring and a test Layer for deterministic tests.
4. Compose feature-owned Layers in the feature package; compose app Layers at entrypoints.
