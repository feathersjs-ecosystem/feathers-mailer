import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    typecheck: {
      enabled: true,
      include: ['test/**/*.test-d.ts'],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{js,ts}'],
      exclude: ['**/*.test.{js,ts}', 'src/types.ts'],
    },
  },
})
