import { describe, expect, it } from "@effect/vitest"
import { TodoId, TodoNotFound } from "@template/domain/TodosApi"
import { Effect } from "effect"

import { TodosRepository } from "../src/TodosRepository.js"

const expectTodoNotFound = <A>(effect: Effect.Effect<A, TodoNotFound>) =>
  effect.pipe(
    Effect.flip,
    Effect.tap((error) => Effect.sync(() => expect(error).toBeInstanceOf(TodoNotFound)))
  )

describe("TodosRepository", () => {
  describe("create", () => {
    it.effect("creates a todo and returns it", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        const todo = yield* repo.create("buy milk")
        expect(todo.text).toBe("buy milk")
        expect(todo.done).toBe(false)
        expect(typeof todo.id).toBe("number")
      }).pipe(Effect.provide(TodosRepository.Default)))
  })

  describe("getById", () => {
    it.effect("returns the todo for an existing id", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        const created = yield* repo.create("read a book")
        const fetched = yield* repo.getById(created.id)
        expect(fetched.id).toBe(created.id)
        expect(fetched.text).toBe("read a book")
      }).pipe(Effect.provide(TodosRepository.Default)))

    it.effect("fails with TodoNotFound for a missing id", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        const missingId = TodoId.make(9999)
        const result = yield* expectTodoNotFound(repo.getById(missingId))
        expect(result.id).toBe(missingId)
      }).pipe(Effect.provide(TodosRepository.Default)))
  })

  describe("complete", () => {
    it.effect("marks an existing todo as done", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        const created = yield* repo.create("exercise")
        const completed = yield* repo.complete(created.id)
        expect(completed.done).toBe(true)
        expect(completed.id).toBe(created.id)
      }).pipe(Effect.provide(TodosRepository.Default)))

    it.effect("fails with TodoNotFound for a missing id", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        yield* expectTodoNotFound(repo.complete(TodoId.make(9999)))
      }).pipe(Effect.provide(TodosRepository.Default)))
  })

  describe("remove", () => {
    it.effect("removes an existing todo", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        const created = yield* repo.create("clean house")
        yield* repo.remove(created.id)
        const result = yield* repo.getById(created.id).pipe(Effect.flip)
        expect(result).toBeInstanceOf(TodoNotFound)
      }).pipe(Effect.provide(TodosRepository.Default)))

    it.effect("fails with TodoNotFound for a missing id", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        yield* expectTodoNotFound(repo.remove(TodoId.make(9999)))
      }).pipe(Effect.provide(TodosRepository.Default)))
  })

  describe("getAll", () => {
    it.effect("returns all created todos", () =>
      Effect.gen(function*() {
        const repo = yield* TodosRepository
        yield* repo.create("first")
        yield* repo.create("second")
        const all = yield* repo.getAll
        expect(all.length).toBe(2)
      }).pipe(Effect.provide(TodosRepository.Default)))
  })
})
