# Add Schema Model

Use this skill before adding or changing a domain model backed by `Schema`.

## Checklist

- Start from `packages/domain/src/TodosApi.ts` and follow the local `Schema.Class`, branded identifier, and boundary-decoding patterns.
- Keep schemas in `packages/domain` unless the type is private to one package.
- Validate serialized or untrusted input with `Schema`; do not accept raw `unknown` or unchecked casts.
- Export new public schemas through generated package exports; do not manually edit generated files outside normal codegen.
- Add tests for successful decoding and rejected invalid input when the schema is used at a package or HTTP boundary.
- If the Effect API is unfamiliar, check <https://www.effect.solutions/> and <https://effect.website/> against the installed package types.
