module.exports = (srcCodeDir, publicPath, DEV) => {

	return [
		{
			test: /\.js$/,
			loader: 'eslint',
			enforce: 'pre',
			exclude: /node_modules/,
			include: srcCodeDir
		},
		{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: /(node_modules|bower_components)/,
			include: srcCodeDir
		},
		{
			test: /\.tpl\.html$/,
			loader: 'html',
			query: { interpolate: true },
			exclude: /(node_modules|bower_components)/,
			include: srcCodeDir + '/components'
		},
		{
			test: /.html$/,
			loader: `file?name=[path][name]-[hash:20].[ext]!extract?publicPath=${publicPath}!html?interpolate`,
			exclude: /(node_modules|bower_components)/,
			include: srcCodeDir + '/app'
		},
		{
			test: /\.(sc|c)ss$/,
			loader: DEV
				? 'style!css!postcss!resolve-url!sass?sourceMap'
				: require('extract-text-webpack-plugin').extract({
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
	];

};
