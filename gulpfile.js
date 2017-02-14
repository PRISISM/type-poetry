var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

/* Vetting Code */
gulp.task('vet', function() {
	return gulp
		.src([
			'./app_client/**/*.js',
			'./app_server/**/*.js',
			'./app_api/**/*.js',
			'./*.js'
		])
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});