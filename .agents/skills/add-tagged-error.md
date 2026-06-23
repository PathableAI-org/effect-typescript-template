# Add Tagged Error

1. Define expected failures as `Schema.TaggedError` in `packages/domain/src`.
2. Include only serializable, non-sensitive fields in the error payload.
3. Thread new errors through Effect error channels instead of defects.
4. Add tests that exercise each new tagged-error path.
