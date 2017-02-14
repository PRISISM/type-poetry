var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // Runs and returns config object
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
gulp.task('inject', ['wiredep'], function() {
	log('Wiring up the bower css/js and our app js into the html!');

	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css), config.injectOptions))
		.pipe($.replace(/="..\/..\/bower_components\//g, '="/bower_components/'))
		.pipe(gulp.dest('./app_server/views/'));
});

/* Starts a development server using nodemon */
gulp.task('serve-dev', ['inject'], function() {
	var isDev = true;

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

});

// gulp.task('clean-code', function(done) {
// 	var files 
// 	clean()
// })

/**/
gulp.task('templatecache')

/* Gulp task to produce an optimize production build in the ./build folder */
gulp.task('optimize', ['inject'] , function() {
		// var assets = $.useref.assets({searchPath:'./'})
		log('Optimizing the javascript, css and html');

		return gulp
			.src(config.index)
			.pipe($.plumber())

		.pipe($.useref({
				searchPath: './',
				base: '../../'
			}))
			.pipe(gulp.dest(config.build));

	})

/////////////////

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