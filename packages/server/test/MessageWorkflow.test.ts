import { describe, expect, it } from "@effect/vitest"
import { Effect } from "effect"

import { buildGreeting, GreetingSourceLive, GreetingSourceTest } from "../src/MessageWorkflow.js"

describe("MessageWorkflow", () => {
  it.effect("runs with the live layer", () =>
    buildGreeting().pipe(
      Effect.tap((result) => Effect.sync(() => expect(result).toBe("Greeting: hello from the live layer"))),
      Effect.provide(GreetingSourceLive)
    ))

  it.effect("runs with a test layer", () =>
    buildGreeting().pipe(
      Effect.tap((result) => Effect.sync(() => expect(result).toBe("Greeting: from test"))),
      Effect.provide(GreetingSourceTest("from test"))
    ))
})
