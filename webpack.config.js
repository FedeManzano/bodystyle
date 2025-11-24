const path = require('path');

module.exports = {
  entry: './src/app.js',

  output: {
    filename: 'bodystyle.js',
    path: path.join(__dirname, 'dist/js'),
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')], use: ["style-loader", "css-loader"] },
    ]
  },
  mode: "development"
};