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
gulp.task('inject', ['wiredep', 'fonts', 'styles' ,'templatecache'], function() {
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

/* Compiles Sass files and outputs*/
gulp.task('styles', function() {
	return gulp.src(config.scss)
		.pipe($.sassGlob())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('styles:watch', function() {
	gulp.watch(config.scss, ['styles']);
});

gulp.task('svg-min', function() {
	return gulp
		.src(config.svg)
		.pipe($.svgmin())
		.pipe(gulp.dest(config.build + '/svg'));
})

/* Loads Google Fonts from a list and outputs to a folder */
gulp.task('fonts', ['clean-fonts'], function() {
	return gulp
		.src('./fonts.list')
		.pipe($.googleWebfonts(config.fontOptions))
		.pipe((gulp.dest('./public/stylesheets')));
});

/* Starts a development server using nodemon */
gulp.task('serve-dev', ['inject', 'styles:watch'], function() {
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

gulp.task('clean-fonts', function() {
	log('Cleaning Fonts');
	return clean(['./public/fonts/**/*', './build/fonts/*']);
})

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
gulp.task('optimize', ['inject', 'svg-min'], function() {
	// var assets = $.useref.assets({searchPath:'./'})
	var cssFilter = $.filter('**/*.css', {restore: true});
	var jsFilter = $.filter('**/*.js', {restore: true});

	log('Copying fonts to build folder...');
	gulp
		.src('./public/fonts/*')
		.pipe(gulp.dest(config.build + '/fonts'));

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
		.on('restart', function(ev) {
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