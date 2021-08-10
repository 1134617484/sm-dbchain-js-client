
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require('terser-webpack-plugin');
// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const entryArr = [
  "./index.js",
]
module.exports = {
  mode: "development",
  entry: entryArr,
  output: {
    path: path.resolve(__dirname, "./dist/js"),
    filename: "dbchain-js-client.js",
    // libraryTarget: 'commonjs2'
    library:{
      type:'commonjs2'
    },
    libraryTarget: 'commonjs2'
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.webSocket': '"192.168.0.193"',
      // "process.env.NODE_DEBUG": JSON.stringify(false)
      // Buffer: JSON.stringify(require("buffer/").Buffer)
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      // process: 'process/browser',
    }),
    // 代码压缩
    new ExtractTextPlugin({
      terserOptions: {
        //生产环境自动删除console
        compress: {
          // warnings: false, // 若打包错误，则注释这行
          drop_debugger: true,
          drop_console: true,
          pure_funcs: ['//console.log', 'console.log'],
          // pure_funcs: [],
        },
      },
      // sourceMap: false,
      parallel: true,
    }),
    // gzip
    // new CompressionWebpackPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //   threshold: 10240, // 只有大小大于该值的资源会被处理 10240
    //   minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //   deleteOriginalAssets: false, // 删除原文件
    // })
  ],
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' },],
  },
  resolve: {
    // https://github.com/babel/babel/issues/8462
    // https://blog.csdn.net/qq_39807732/article/details/110089893
    // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      //   crypto: require.resolve('crypto-js'),  
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      "assert": require.resolve("assert"),
      "constants": require.resolve("constants-browserify"),
      "events": require.resolve("events"),
    },
    // 如果确认不需要node polyfill，设置resolve.alias设置为false
    alias: {
      fs: false,
      process: "process/browser"
    }
  },
  devtool: 'source-map',
  
}

// module.exports = {
//   mode: 'development', // production
//   entry: './lib/index.js',
//   output: {
//     path: path.resolve(__dirname, "./dist/js"),
//     filename: "dbchain-js-client.js",
//     libraryTarget: 'commonjs2'
//   },

//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   plugins: [
//     // new CleanWebpackPlugin(),

//     // new webpack.DefinePlugin({
//     //   "process.env.NODE_DEBUG": JSON.stringify(false)
//     //   // Buffer: JSON.stringify(require("buffer/").Buffer)
//     // }),
//     new webpack.ProvidePlugin({
//       Buffer: ["buffer", "Buffer"]
//     })
//   ],
//   module: {
//     rules: [{ test: /\.txt$/, use: 'raw-loader' }],
//   },
//   resolve: {
//     // https://github.com/babel/babel/issues/8462
//     // https://blog.csdn.net/qq_39807732/article/details/110089893
//     // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
//     fallback: {
//       "crypto": require.resolve("crypto-browserify"),
//       //   crypto: require.resolve('crypto-js'),  
//       "buffer": require.resolve("buffer/"),
//       "util": require.resolve("util/"),
//       stream: require.resolve('stream-browserify'),
//       path: require.resolve('path-browserify'),
//       "assert": require.resolve("assert"),
//       "constants": require.resolve("constants-browserify"),
//       "events": require.resolve("events"),


//     },
//     // 如果确认不需要node polyfill，设置resolve.alias设置为false
//     alias: {
//       fs: false
//     }
//   },
//   // devtool: 'source-map' // 小程序不支持eval-source-map
// };