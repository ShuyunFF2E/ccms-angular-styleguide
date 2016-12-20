/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
const path = require('path');
const argv = require('yargs').argv;
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const cssNanoCommonOpts = {
	discardComments: {removeAll: true},
	discardDuplicates: true,
	discardOverridden: true,
	discardUnused: true,
	minifyGradients: true
};

// 根据 build 变量获取应用信息及系统环境等信息
const srcCodeDir = path.join(__dirname, 'src');
const buildOutputDir = path.join(__dirname, 'dist');
const packageInfo = require('./package.json');
const packageName = packageInfo.name;
const appName = packageName.substr(packageName.indexOf('ccms-') + 5);
const publicPath = '/' + appName + '/';
const systemEnv = argv.env;
// 不同环境的系统 api 接口信息
const apiDomains = require('./api-domain.json');

module.exports = {
	devtool: 'source-map',
	context: srcCodeDir,
	entry: {
		app: './app/index.js',
		lib: Object.keys(packageInfo.dependencies)
	},
	output: {
		path: buildOutputDir,
		filename: '[name]-[chunkhash:20].min.js',
		publicPath: publicPath,
		jsonpFunction: appName.split('-').join('') + 'Jsonp'
	},
	externals: {
		'angular': 'angular',
		'angular-resource': '\'ngResource\'',
		'angular-ui-router': '\'ui.router\'',
		'ccms-components': '\'ccms.components\''
	},
	plugins: [
		new CleanPlugin([buildOutputDir]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				API_DOMAIN: JSON.stringify(apiDomains[systemEnv])
			}
		}),
		new HTMLPlugin({
			template: './index.html',
			filename: buildOutputDir + '/index.html',
			excludeChunks: ['lib'],
			inject: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'init',
			chunks: ['app', 'lib']
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	sourceMap: true,
		// 	compress: {
		// 		warnings: true
		// 	},
		// 	include: /\.min\.js$/
		// }),
		new ExtractTextPlugin({
			filename: '[name]-[hash:20].min.css',
			disable: false,
			allChunks: true
		}),
		// 处理extract出来的css
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: cssnano({reduceIdents: false}),
			cssProcessorOptions: Object.assign({
				core: false
			}, cssNanoCommonOpts),
			canPrint: true
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				env: systemEnv,
				context: srcCodeDir,
				output: {
					path: buildOutputDir
				},
				minimize: true,
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
				test: /\.js?$/,
				loader: 'eslint',
				enforce: 'pre',
				exclude: /node_modules/,
				include: srcCodeDir
			},
			{
				test: /\.js?$/,
				loaders: ['babel'],
				exclude: /(node_modules|bower_components)/,
				include: [srcCodeDir, path.join(__dirname, 'demo')]
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
				loader: `file?name=[path][name]-[hash:20].[ext]!extract?publicPath=${publicPath}!html`,
				exclude: /(node_modules|bower_components)/,
				include: srcCodeDir + '/app'
			},
			{
				test: /\.(sc|c)ss$/,
				loader: ExtractTextPlugin.extract({
					notExtractLoader: 'style',
					loader: 'css?-minimize!postcss!resolve-url!sass?sourceMap'
				})
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
