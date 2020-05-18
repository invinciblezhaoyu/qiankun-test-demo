const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8090
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      title: 'html-test'
    })
  ]
}