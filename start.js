require('babel-register') ({
    // presets: [ 'env', ],
    presets: ["babel-preset-myPreset", "@babel/preset-env", ],
    plugins: ["@babel/plugin-transform-runtime","@babel/core"]
})

module.exports = require('./index.js')