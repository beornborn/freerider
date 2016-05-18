var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: "./app/Routes",
  output: {
    path: path.join(__dirname, '../public'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['babel-root-import']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
  resolve: {
    extensions: ['', '.js', '.css'],
    root: [path.join(__dirname, './app')]
  }
}
