
import ts from "@wessberg/rollup-plugin-ts";
export default {
  input: "src/index.ts",
  output: {
    file: 'lib/bundle.js',
    format: 'cjs'
  },
  plugins: [
    ts({
      /* Plugin options */
    })
  ]
}