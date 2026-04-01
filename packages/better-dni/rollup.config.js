import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/index.js",
      format: "umd",
      name: "dni",
      sourcemap: true,
    },
    {
      file: "./dist/index.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [typescript(), terser()],
};
