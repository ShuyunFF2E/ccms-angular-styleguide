/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-30
 */

var path = require('path');
var jsonServer = require('json-mock-kuitos');
var webpack = require('webpack');
var config = require('./webpack-dev.config');
var url = require('url');

var app = jsonServer.create();
var compiler = webpack(config);

var apiPrefix = '';
var filename = path.resolve(__dirname, './mock/db.json');

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: false,
	stats: {
		colors: true,
		cached: false
	},
	publicPath: config.output.publicPath
}));

// redirect root location to portal index
app.use(/\/$/, function(req, res) {
	res.redirect('/portal/index.html');
});

app.use(/\/web-portal\/yangyangyang3\/system/, function(req, res) {
	res.redirect('/web-portal/qiushi/system');
});

app.use('/web-portal', jsonServer.proxy('http://172.18.21.89', '2333'));
app.use('/dashboard', jsonServer.proxy('http://qiushi.ccmsyun.com', '8181'));

app.use(require('webpack-hot-middleware')(compiler));
app.use(jsonServer.defaults({static: path.resolve(__dirname)}));
app.use(jsonServer.router(apiPrefix, filename));

app.listen(3000, 'localhost', function(err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:3000');
});
