/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const srcCodeDir = path.join(__dirname, 'src');
const API_DOMAIN = '';
const publicPath = '/';
const genRules = require('./webpack-common.config');

module.exports = {
	devtool: 'source-map',
	entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', './src/app/index.js'],
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath // hot loader publish dir
	},
	externals: {
		'angular': 'angular',
		'angular-resource': '\'ngResource\'',
		'angular-ui-router': '\'ui.router\'',
		'ccms-components': '\'ccms.components\''
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				API_DOMAIN: JSON.stringify(API_DOMAIN)
			}
		}),
		new HTMLPlugin({
			template: './src/index.html',
			filename: './app/index.html',
			inject: false
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				env: 'develop',
				context: srcCodeDir,
				output: {
					path: path.join(__dirname, publicPath)
				},
				postcss: [autoprefixer({browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7']})],
				eslint: {
					emitWarning: true,
					emitError: true,
					formatter: require('eslint-friendly-formatter')
				},
			}
		})
	],
	resolve: {
		extensions: ['.js']
	},
	resolveLoader: {
		moduleExtensions: ['-loader']
	},
	module: {
		rules: genRules(srcCodeDir, publicPath, true)
	}
};
