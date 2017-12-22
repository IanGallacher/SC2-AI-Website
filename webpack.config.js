const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Path = require('path');

const paths = {
  DIST: Path.resolve(__dirname, 'client'),
  SRC: Path.resolve(__dirname, 'app'),
  JS: Path.resolve(__dirname, 'app'),
};

module.exports = {
  entry: Path.join(paths.JS, 'js/component/app.js'),
  output: {
    path: paths.DIST,
    filename: 'js/bundle.js'
  },
  // Tell webpack to use html plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin({
        filename: "[name].[contenthash].css",
        disable: process.env.NODE_ENV === "development"
    })
  ],
  devServer: {
    contentBase: paths.DIST,
    // For single page applications, we always fallback to index.html.
    // Let React handle routing.
    historyApiFallback: {
      index: 'index.html'
    }, proxy: {
      "/api": "107.161.27.148:3000"
    }
  },
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
