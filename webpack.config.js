const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
   main: './src/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};