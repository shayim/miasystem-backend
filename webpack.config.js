const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader'
    }]
  },
  plugins: [
    new NodemonPlugin()
  ],
  externals: [
    NodeExternals()
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  mode: 'development',
  watch: true
}
