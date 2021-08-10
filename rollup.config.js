// export default {
//     input: 'index.js',
//     output: {
//       file: 'lib/index.js',
//       format: 'cjs',
//     },
//   };
import json from '@rollup/plugin-json'

import nodeResolve from 'rollup-plugin-node-resolve'     // 帮助寻找node_modules里的包
import babel from 'rollup-plugin-babel'                             // rollup 的 babel 插件，ES6转ES5
import replace from 'rollup-plugin-replace'                       // 替换待打包文件里的一些变量，如 process在浏览器端是不存在的，需要被替换
import commonjs from 'rollup-plugin-commonjs'              // 将非ES6语法的包转为ES6可用
import uglify from 'rollup-plugin-uglify'                              // 压缩包
import nodePolyfills from 'rollup-plugin-node-polyfills'; //汇总插件节点polyfills
import builtins from 'rollup-plugin-node-builtins';//允许节点内置被required/ imported。这样做可以提供适当的垫片来支持为 Browserify 设计的模块，一些模块需要rollup-plugin-node-globals。
const env = process.env.NODE_ENV

const config = {
  input: 'index.js',
  external: [],                           // 告诉rollup，不打包react,redux;将其视为外部依赖
  output: {
    format: 'cjs',       　　　　　　　　　　 // 输出 ＵＭＤ格式，各种模块规范通用(amd, cjs, esm, iife, umd)
    name: 'dbchain',　　　　　　　　　// 打包后的全局变量，如浏览器端 window.ReactRedux　
    globals: {
      dbchain: 'dbchain',
      crypto: 'crypto$2',
      buffer: 'buffer',
      util: 'util',
      fs: 'fs',
      path: 'path',
      os: 'os',                                        // 这跟external 是配套使用的，指明global.React即是外部依赖react
    },
    file: 'lib/index.js',
  },
  plugins: [
    
    nodeResolve({
      browser: true,
      dedupe: ['svelte'],
      preferBuiltins: true
    }),
    commonjs({
      'namedExports': {
        './node_modules/secp256k1/index.js': ['publicKeyCreate', 'ecdsaSign', 'esdsaVerify'],
        './node_modules/secp256k1/elliptic.js':['publicKeyCreate','ecdsaSign', 'esdsaVerify'],
        './node_modules/@tendermint/belt/index.js': ['bytesToBase64', 'toCanonicalJSONBytes', 'base64ToBytes']
      }
    }),
    builtins(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    json(),
    babel({
      exclude: '**/node_modules/**'
    }),
    nodePolyfills(),
    // uglify({
    //   compress: {
    //     pure_getters: true,
    //     unsafe: true,
    //     unsafe_comps: true,
    //     warnings: false
    //   }
    // }),
    
    
  ],

}



export default config