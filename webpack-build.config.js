/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({filename: '/build/assets.json', prettyPrint: true, update: true});
var autoprefixer = require('autoprefixer');
var packages = require('./package.json');

module.exports = {
  devtool: 'source-map',
  entry  : {
    app   : './src/app/app.js',
    vendor: Object.keys(packages.dependencies)
  },
  output : {
    path      : path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename  : '[name]-[hash:8].js'
  },
  plugins: [
    new CleanPlugin('build'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor',
      'vendor-[hash:8].js'
    ),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    assetsPluginInstance
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
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
        test   : /\.jsx?$/,
        loader : 'eslint-loader',
        exclude: /(node_modules|src\/app\/containers)|(src\/app\/App\.jsx)/,
        include: path.join(__dirname, 'src')
      }
    ],

    loaders: [
      {
        test   : /\.jsx?$/,
        loaders: ['babel'],
        exclude: /(node_modules|bower_components)/,
        include: [path.join(__dirname, 'src')]
      },
      {
        test   : /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test   : /\.html$/,
        loaders: ['html'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test   : /\.scss$/,
        loaders: ['style', 'css', 'sass', 'postcss']
      }
    ]
  }
};
