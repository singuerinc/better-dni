import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      outDir: "dist/types",
      rollupTypes: true,
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
});
