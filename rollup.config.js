import Vue from "rollup-plugin-vue"
import path from "path"
import serve from "rollup-plugin-serve"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import builtins from "@erquhart/rollup-plugin-node-builtins"
import globals from "rollup-plugin-node-globals"

const dev = process.env.DEV == "true"

export default {
    input: path.resolve(__dirname, 'src/app.js'),
    output: {
        name: "onlyoffice.js",
        format: "amd",
        file: "web/onlyoffice.js"
    },
    plugins: [
        Vue(),
        resolve({
          mainFields: ["browser", "jsnext", "module", "main"],
          include: "node_modules/**",
          preferBuiltins: true
        }),
        dev && serve({
            contentBase: ["web"],
            port: process.env.PORT || 5566
        }),
        babel({
          exclude: "node_modules/**",
          runtimeHelpers: true
        }),
        commonjs({
          include: "node_modules/**"
        }),
        globals(),
        builtins()
    ]
}