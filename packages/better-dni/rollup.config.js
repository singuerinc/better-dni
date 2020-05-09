import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "./dist",
    format: "umd",
    name: "dni",
    sourcemap: true,
  },
  plugins: [typescript()],
};
