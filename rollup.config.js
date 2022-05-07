import styles from "rollup-plugin-styles";
const autoprefixer = require('autoprefixer');
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel';

const input = 'src/RRMultiSelect.js'

var MODE = [
  {fomart: 'cjs'},
  {fomart: 'esm'},
  {fomart: 'umd'}
]

var config = []

MODE.map((m) => {
  var conf = {
    input: input,
    output: {
      name: "rr-multi-select",
      file: `dist/index.${m.fomart}.js`,
      format: m.fomart,
      exports: "auto",
      globals: {
        'react': 'React',
        'lodash': 'lodash',
      },
    },
    external: ["react", 'lodash'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        // plugins: ['@babel/transform-runtime'],
        babelHelpers: 'bundled'
      }),
      terser(),
      // sourcemaps(),
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
