const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv').config();

module.exports = {
  resolve: {
    extensions: ['.vue', '.js', 'ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'], // TODO: issue 정리 css-loader가 sass-loader 앞에 와야함
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
        },
      ],
    }),
    new webpack.EnvironmentPlugin(Object.keys(dotenv.parsed || {})),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
