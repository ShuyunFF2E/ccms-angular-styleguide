/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry  : [
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    './src/app/app.js'
  ],
  output : {
    path      : path.join(__dirname, 'build'),
    filename  : 'bundle.js',
    publicPath: '/' // hot loader publish dir
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.css']
  },
  eslint : {
    configFile : '.eslintrc',
    emitWarning: true,
    emitError  : true,
    formatter  : require('eslint-friendly-formatter')
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  module : {
    preLoaders: [
      {
        test   : /\.js$/,
        loader : 'eslint-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      }
    ],

    loaders: [
      {
        test   : /\.js?$/,
        loaders: ['babel'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test   : /\.html$/,
        loaders: ['html'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test   : /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test   : /\.scss$/,
        loaders: ['style', 'css', 'sass', 'postcss']
      }

    ]
  }
};
