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

module.exports = {
	devtool: 'source-map',
	entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', './src/app/index.js'],
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/' // hot loader publish dir
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
					path: path.join(__dirname, '/')
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

		rules: [
			{
				test: /\.js$/,
				loader: 'eslint',
				enforce: 'pre',
				exclude: /node_modules/,
				include: [srcCodeDir]
			},
			{
				test: /\.js?$/,
				loaders: ['babel'],
				exclude: /(node_modules|bower_components)/,
				include: [srcCodeDir]
			},
			{
				test: /\.tpl\.html$/,
				loader: 'html',
				query: {interpolate: true},
				exclude: /(node_modules|bower_components)/,
				include: srcCodeDir + '/components'
			},

			{
				test: /.html$/,
				loader: 'file?name=[path][name]-[hash:20].[ext]!extract?publicPath=/!html',
				exclude: /(node_modules|bower_components)/,
				include: srcCodeDir + '/app'
			},
			{
				test: /\.(sc|c)ss$/,
				loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass?sourceMap'],
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash:20].[ext]'
				]
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
			},
			{
				test: /\.svg(#\w+)?$/,
				loader: 'url?limit=15000&mimetype=image/svg+xml&prefix=fonts'
			}

		]
	}
};
