/**
 *
 * (c) Copyright Ascensio System SIA 2024
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import Vue from "rollup-plugin-vue";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import builtins from "@erquhart/rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";

const dev = process.env.DEV == "true"

export default {
    input: "src/app.js",
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
        builtins(),
        json(),
        postcss({
          plugins: []
        })
    ]
}