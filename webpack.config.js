const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const Path = require('path');

const paths = {
  ROOT: Path.resolve(__dirname, ''),
  DIST: Path.resolve(__dirname, 'public'),
  SRC: Path.resolve(__dirname, 'client-src'),
  JS: Path.resolve(__dirname, 'client-src'),
  SCSS: Path.resolve(__dirname, 'client-src'),
};

module.exports = {
  entry: Path.join(paths.JS, 'js/routing/app.js'),
  output: {
    path: paths.DIST,
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  // Tell webpack to use html plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin({
        filename: "[name].[contenthash].css",
        disable: process.env.NODE_ENV === "development"
    }),
    new StyleLintPlugin({
      context: paths.SCSS,
    })
  ],
  devServer: {
    contentBase: paths.DIST,
    // For single page applications, we always fallback to index.html.
    // Let React handle routing.
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      "/api": "http://localhost:3000",
      "/user-upload": "http://localhost:3000"
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: "file-loader",
        options: {
          outputPath: "img/"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
