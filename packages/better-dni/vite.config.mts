import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      outDirs: "dist/types",
      exclude: ["src/__test__/**"],
      bundleTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: new URL("src/index.ts", import.meta.url).pathname,
      name: "dni",
      formats: ["umd", "es"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.js"),
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "node",
    coverage: {
      enabled: true,
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/__test__/**", "src/@types/**"],
      reportsDirectory: "./coverage",
      reporter: ["json", "lcov", "text-summary"],
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: -10,
      },
    },
  },
});
