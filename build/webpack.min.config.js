const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const WebpackBaseConfig = require('./webpack.base.config')

module.exports = merge(WebpackBaseConfig, {
  mode: 'production',

  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'react-flip-transition',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: `[file].map`
    })
  ]
})
