module.exports = function() {
	var views = './app_server/views/';
	var server = ['./app_server/**/*.js', 'app.js'];

	var config = {
		// All JS used to vet
		alljs: [
			'./app_client/**/*.js',
			'./app_server/**/*.js',
			'./app_api/**/*.js',
			'./*.js'
		],
		index: views + '*.pug',
		js: [
			'./public/javascripts/*.js',
			'./app_client/**/*.js',

		],
		css: [
			'./public/stylesheets/*.css',
			'./public/fonts/**/*.css'
		],
		scss: ['./public/stylesheets/**/*.scss'
		],
		svg: ['./public/svg/**/*.svg'],
		audio: ['./public/audio/*.mp3'],
		htmltemplates: './app_client/**/*.view.html',
		injectOptions: {
			// ignorePath: ['app_client', 'public']
		},
		build: './build/',
		temp: '.tmp/',
		/* Bower and NPM locations*/
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			replace: {
				js: '<script src="./{{filePath}}"></script>'
			}
		},

		/* Template Cache */
		templateCache: {
			file: 'templates.js',
			options: {
				module: 'myApp',
				standAlone: false,
				root: 'app_client/'
			}
		},

		/* Font Options for Google Webfonts */
		fontOptions: {
			fontsDir: '../fonts/',
			cssDir: '',
			cssFilename: 'fonts.css'
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