module.exports = function() {
	var views = './app_server/views/';
	var server = ['./app_server/', './app.js'];

	var config = {
		// All JS used to vet
		alljs: [
			'./app_client/**/*.js',
			'./app_server/**/*.js',
			'./app_api/**/*.js',
			'./*.js'
		],
		index: views + 'layout.pug',
		js: [
			'./app_client/**/*.js',
			'./public/javascripts/*.js'
		],
		css: [
			'./public/stylesheets/*.css'
		],
		injectOptions: {
			// ignorePath: ['app_client', 'public']
		},
		build: './build/',
		/* Bower and NPM locations*/
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			replace: {
				js: '<script src="./{{filePath}}"></script>'
			}
		},

		/* Nodemon */
		defaultPort: 3000,
		nodeServer: './bin/www',
		server: server
	};

	config.getWiredepDefaultOptions = function() {
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath,
			replace: config.bower.replace
		};
	};

	return config;

};