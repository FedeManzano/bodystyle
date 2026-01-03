const path = require('path');

module.exports = {
  entry: './src/app.js',

  output: {
    filename: 'bodystyle.min.js',
    path: path.join(__dirname, 'dist/js'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.css']
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
    ]
  },
  mode: "production"
};