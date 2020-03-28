const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, {
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        // 事前処理
        enforce: 'pre',
        // TypeScript をコードチェックする
        loader: 'tslint-loader',
        // 定義ファイル
        options: {
          configFile: './tslint.json',
          // airbnb というJavaScriptスタイルガイドに従うには下記が必要
          typeCheck: true,
        },
      }, {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },

    ],
  },
  // webpack watch したときに差分ビルドができる
  cache: true,
  // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
  // production は、コードの圧縮やモジュールの最適化が行われる設定となる
  mode: 'development', // "production" | "development" | "none"
  // ソースマップのタイプ
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js', // node_modulesのライブラリ読み込みに必要
    ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './app/assets'),
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
  ],
};