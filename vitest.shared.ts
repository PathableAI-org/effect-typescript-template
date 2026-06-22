import * as path from "node:path"
import type { UserConfig } from "vitest/config"

const dirname = import.meta.dirname

const alias = (name: string) => {
  const target = process.env.TEST_DIST !== undefined ? "dist/dist/esm" : "src"
  return ({
    [`@template/${name}/test/`]: `${path.join(dirname, "packages", name, "test")}/`,
    [`@template/${name}/`]: `${path.join(dirname, "packages", name, target)}/`,
    [`@template/${name}`]: path.join(dirname, "packages", name, target)
  })
}

const aliases = {
  ...alias("cli"),
  ...alias("domain"),
  ...alias("server")
}

// This is a workaround, see https://github.com/vitest-dev/vitest/issues/4744
const config: UserConfig = {
  esbuild: {
    target: "es2020"
  },
  optimizeDeps: {
    exclude: ["bun:sqlite"]
  },
  resolve: {
    alias: aliases
  },
  test: {
    setupFiles: [path.join(dirname, "setupTests.ts")],
    fakeTimers: {
      toFake: undefined
    },
    sequence: {
      concurrent: true
    },
    include: ["test/**/*.test.ts"]
  }
}

export default config
