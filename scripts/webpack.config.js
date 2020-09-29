
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve('test/index.js'),
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'test.bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin({
    template: "test/index.html",
    inject: true
  })]
}