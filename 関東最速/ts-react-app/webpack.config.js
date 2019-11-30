const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  // Electron設定
  {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [
              'es2015',
              'react',
            ],
          },
        },
      ],
    },
    target: 'electron',
  },
  // React 設定
  {
    entry: {
      react: './src/index.tsx',
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [
              'es2015',
              'react',
            ],
          },
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    // Electron Renderの設定
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: path.join(__dirname, 'build/index.html'),
        inject: false,
      }),
    ],
  },
];
