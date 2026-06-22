import { Effect } from "effect"

import { TodosRepository } from "./TodosRepository.js"

export const createAndCompleteTodo = Effect.fn("TodoWorkflow.createAndCompleteTodo")(function*(text: string) {
  const todos = yield* TodosRepository
  const created = yield* todos.create(text)
  return yield* todos.complete(created.id)
})
