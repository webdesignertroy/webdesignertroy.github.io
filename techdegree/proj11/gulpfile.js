"use strict";
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglifycss = require('gulp-uglifycss'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch');

gulp.task("concatCSS", function(){
	return gulp.src([
		'css/normalize.css',
        'css/foundation.css',
        'css/basics.css',
        'css/menu.css',
        'css/hero.css',
        'css/photo-grid.css',
        'css/modals.css',
        'css/footer.css'
		])
	.pipe(concat('style.css'))
	.pipe(gulp.dest('css'))
});


gulp.task("concatScripts", function(){
	return gulp.src([
		'js/jquery.js',
		'js/fastclick.js',  
		'js/foundation.js',
		'js/foundation.equalizer.js',
		'js/foundation.reveal.js',
		'js/scripts.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('js'))
});

gulp.task("minifyCSS", ['concatCSS'], function(){
	return gulp.src("css/style.css")
		.pipe(uglifycss())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('css'))
});

gulp.task("minifyScripts",['concatScripts'], function(){
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'))
});

gulp.task('watchCSS', function(){
	gulp.watch('css/*.css', ['minifyCSS']);
	gulp.watch('js/*.js', ['minifyScripts']);
});

gulp.task('build', ['minifyCSS', 'minifyScripts'])	

gulp.task('default', ['build']);