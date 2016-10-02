"use strict";

// Variables
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglifycss = require('gulp-uglifycss'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

// concatCSS Function
gulp.task("concatCSS", function() {
	return gulp.src([
		'css/normalize.css',
		'css/basic.css',
		'css/header.css'
		])
		.pipe(concat('style.css'))
		.pipe(gulp.dest('css'));
});

// concatScripts Function
gulp.task("concatScripts", function() {
	return gulp.src([
		'js/main.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('js'));
});

// MinifyCSS Function
gulp.task("minifyCSS", ['concatCSS'], function(){
	return gulp.src("css/style.css")
		.pipe(uglifycss())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('css'));
});

// MinifyScripts Function
gulp.task("minifyScripts", ['concatScripts'], function() {
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('watch', function(){
	gulp.watch(['css/*.css','!css/style.css', '!css/style.min.css'], ['minifyCSS']);
	gulp.watch(['js/*.js', '!js/app.js', '!js/app.min.js'],['minifyScripts']);
});

gulp.task('build', ['minifyCSS', 'minifyScripts']);

gulp.task('default', ['build']);




