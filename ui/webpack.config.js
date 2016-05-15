var path = require('path')

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {presets: ['react', 'es2015']}
      },
      {
        test: /\.css$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};
