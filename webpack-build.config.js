/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var argv = require('yargs').argv;
var webpack = require('webpack');
var HTMLPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var cssnano = require('cssnano');
var cssNanoCommonOpts = {
	discardComments: {removeAll: true},
	discardDuplicates: true,
	discardOverridden: true,
	discardUnused: true,
	minifyGradients: true
};

// 根据 build 变量获取应用信息及系统环境等信息
var env = argv.env;
var appName = env.appName;
var systemEnv = env.sysEnv;
// 不同环境的系统 api 接口信息
var apiDomains = require('./api-domain.json');

module.exports = {
	env: 'production',
	devtool: 'source-map',
	context: path.join(__dirname, 'src'),
	entry: './app/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]-[hash:20].min.js',
		publicPath: '/' + appName + '/',
		jsonpFunction: appName + 'Jsonp'
	},
	externals: {
		'angular': 'angular',
		'angular-resource': '\'ngResource\'',
		'angular-ui-router': '\'ui.router\'',
		'ccms-components': '\'ccms.components\''
	},
	plugins: [
		new CleanPlugin(['dist']),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				API_DOMAIN: JSON.stringify(apiDomains[systemEnv])
			}
		}),
		new HTMLPlugin({
			template: './index.html',
			filename: '../' + appName + '/index.html',
			inject: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		}),
		new ExtractTextPlugin('[name]-[hash:20].min.css'),
		// 处理extract出来的css
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: cssnano({reduceIdents: false}),
			cssProcessorOptions: Object.assign({
				core: false
			}, cssNanoCommonOpts),
			canPrint: true
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/g,
			cssProcessor: cssnano({reduceIdents: false}),
			cssProcessorOptions: cssNanoCommonOpts,
			canPrint: true
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: ['', '.js']
	},
	eslint: {
		emitWarning: true,
		emitError: true,
		formatter: require('eslint-friendly-formatter')
	},
	postcss: [autoprefixer({browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7']})],
	module: {
		preLoaders: [
			{
				test: /\.js?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				include: path.join(__dirname, 'src')
			}
		],

		loaders: [
			{
				test: /\.js?$/,
				loaders: ['babel'],
				exclude: /(node_modules|bower_components)/,
				include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')]
			},
			{
				test: /\.tpl\.html$/,
				loader: 'html',
				query: {interpolate: true},
				exclude: /(node_modules|bower_components)/,
				include: path.join(__dirname, 'src/components')
			},

			{
				test: /.html$/,
				loader: 'file?name=[path][name]-[hash:20].[ext]',
				exclude: /(node_modules|bower_components)/,
				include: path.join(__dirname, 'src/app')
			},
			{
				test: /\.(sc|c)ss$/,
				loader: ExtractTextPlugin.extract({
					loader: 'css?-minimize!postcss!resolve-url!sass?sourceMap',
					fallbackLoader: 'style'
				}),
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash:20].[ext]'
				]
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=15000&mimetype=application/font-woff&prefix=fonts'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=15000&mimetype=application/octet-stream&prefix=fonts'
			},
			{
				test: /\.eot(\?#\w+)?$/,
				loader: 'url?limit=15000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
			},
			{
				test: /\.svg(#\w+)?$/,
				loader: 'url?limit=15000&mimetype=image/svg+xml&prefix=fonts'
			}

		]
	}
};
