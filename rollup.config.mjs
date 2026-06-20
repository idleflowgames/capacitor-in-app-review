import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default {
  input: "dist/esm/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: pkg.unpkg,
      format: "iife",
      name: "capacitorInAppReview",
      globals: { "@capacitor/core": "capacitorExports" },
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  external: ["@capacitor/core"],
};
