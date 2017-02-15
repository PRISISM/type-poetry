var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // Runs and returns config object
var del = require('del');
var port = process.env.PORT || config.defaultPort;

var $ = require('gulp-load-plugins')({
	lazy: true
});

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

/* Vetting Code */
gulp.task('vet', function() {
	log('Analyzing souce with JSHint and JSCS');
	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe($.jshint.reporter('fail'));
});

/* Wiredep injection of bower components and javascript files */
gulp.task('wiredep', function() {
	var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js), config.injectOptions))
		.pipe(gulp.dest('./app_server/views/'));
});

/* Injects custom CSS and runs wiredep */
gulp.task('inject', ['wiredep', 'templatecache'], function() {
	log('Wiring up the bower css/js and our app js into the html!');

	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css), config.injectOptions))
		.pipe($.replace(/="..\/..\/bower_components\//g, '="/bower_components/'))
		.pipe(gulp.dest('./app_server/views/'));
});

/* Starts a build server */
gulp.task('serve-build',['optimize'], function() {
	serve(false /*Is Build*/); 
});

/* Starts a development server using nodemon */
gulp.task('serve-dev', ['inject'], function() {
	serve(true /*Is Dev*/);
});

gulp.task('templatecache', ['clean-code'], function() {
	log('Creating AngularJS $templatecache');
	return gulp
		.src(config.htmltemplates)
		.pipe($.minifyHtml({
			empty: true
		}))
		.pipe($.angularTemplatecache(
			config.templateCache.file,
			config.templateCache.options))
		.pipe(gulp.dest(config.temp));
});

gulp.task('clean-code', function() {
	log('Cleaning Code');
	var files = [].concat(
		'./.tmp/**/*.js',
		'./build/**/*.pug',
		'./build/js/**/*.js'
	);
	return clean(files);
});

/* Gulp task to produce an optimize production build in the ./build folder */
gulp.task('optimize', ['inject'], function() {
	// var assets = $.useref.assets({searchPath:'./'})
	var cssFilter = $.filter('**/*.css', {restore: true});
	var jsFilter = $.filter('**/*.js', {restore: true});

	log('Optimizing the javascript, css and html');

	var templateCache = config.temp + config.templateCache.file;
	log(templateCache);

		return gulp
		.src(config.index)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, {
			read: false
		}), {
			starttag: '<!--inject:templates:js-->',
			endtag: '<!--endinject-->'
		}))
		.pipe($.useref({
			searchPath: './',
			base: '../../'
		}))
		/* CSS Minification */
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore)
		/* JS Minification */
		.pipe(jsFilter)
		.pipe($.uglify())
		.pipe(jsFilter.restore)

		.pipe(gulp.dest(config.build));

})

/////////////////

function clean(path) {
	log('Cleaning: ' + $.util.colors.blue(path));
	return del(path); //promise 
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}

function serve(isDev) {
		var isDev = isDev;

	var nodeOptions = {
		script: config.nodeServer,
		delayTime: 1,
		env: {
			'PORT': port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch: config.server
	};
	return $.nodemon(nodeOptions)
		.on('restart', ['vet'], function(ev) {
			log('Nodemon restarted');
			log('Files changed on restart:\n' + ev);
		})
		.on('start', function() {
			log('Nodemon started');
		})
		.on('crash', function() {
			log('Nodemon crashed');
		})
		.on('exit', function() {
			log('Nodemon exited cleanly');
		});
}