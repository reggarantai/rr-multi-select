import styles from "rollup-plugin-styles";
const autoprefixer = require('autoprefixer');
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel';

// the entry point for the library
const input = 'src/RRMultiSelect.js'

//
var MODE = [
  {
    fomart: 'cjs'
  },
  {
    fomart: 'esm'
  },
  {
    fomart: 'umd'
  }
]




var config = []


MODE.map((m) => {
    var conf = {
        input: input,
        output: {
            // then name of your package
            name: "rr-multi-select",
            file: `dist/index.${m.fomart}.js`,
            format: m.fomart,
            exports: "auto",
            globals: {
              'react': 'React',
              'lodash': 'lodash',
            },
        },
        // this externelizes react to prevent rollup from compiling it
        external: ["react", 'lodash'],
        plugins: [
            // these are babel comfigurations
            babel({
                exclude: 'node_modules/**',
                // plugins: ['@babel/transform-runtime'],
                babelHelpers: 'bundled'
            }),
            terser(),
            // this adds sourcemaps
            // sourcemaps(),
            // this adds support for styles
            styles({
                postcss: {
                    plugins: [
                        autoprefixer()
                    ]
                }
            })
        ]
    }
    config.push(conf)
})

export default [
  ...config,
]
