import { Context, Effect, Layer } from "effect"

export interface GreetingSourceService {
  readonly getMessage: Effect.Effect<string>
}

export class GreetingSource extends Context.Tag("api/GreetingSource")<GreetingSource, GreetingSourceService>() {}

export const GreetingSourceLive = Layer.succeed(GreetingSource, {
  getMessage: Effect.succeed("hello from the live layer")
})

export const GreetingSourceTest = (message: string) =>
  Layer.succeed(GreetingSource, {
    getMessage: Effect.succeed(message)
  })

export const buildGreeting = Effect.fn("MessageWorkflow.buildGreeting")(function*() {
  const source = yield* GreetingSource
  const message = yield* source.getMessage
  return `Greeting: ${message}`
})
