# Add Schema Model

1. Define new domain models with `Schema` in `packages/domain/src`.
2. Prefer `Schema.Class` for structured records and branded types for identifiers.
3. Keep validation at the boundary and export both schema and TypeScript type.
4. Add or update tests for decode/encode behavior where data crosses boundaries.
