import { describe, expect, it } from "@effect/vitest"
import { Effect } from "effect"

import { TodosRepository } from "../src/TodosRepository.js"
import { createAndCompleteTodo } from "../src/TodoWorkflow.js"

describe("TodoWorkflow", () => {
  it.effect("creates and completes a todo with the live layer", () =>
    createAndCompleteTodo("write docs").pipe(
      Effect.tap((todo) => Effect.sync(() => expect(todo.done).toBe(true))),
      Effect.provide(TodosRepository.Default)
    ))
})
