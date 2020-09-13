const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {

  mode: 'production',

  entry: resolve(__dirname, '../src/index'),

  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'react-flip-transition',
    libraryTarget: 'umd',
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },

  resolve: {
    extensions: ['.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /.ts|tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: `[file].map`
    })
  ]
}
