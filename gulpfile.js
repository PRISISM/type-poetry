var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // Runs and returns config object

var $ = require('gulp-load-plugins')({lazy: true});

/* Vetting Code */
gulp.task('vet', function() {
	log('Analyzing souce with JSHint and JSCS');
	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
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
		.pipe(gulp.dest('./app_server/views/'));
});

/////////////////

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	}
	else {
		$.util.log($.util.colors.blue(msg));
	}
}