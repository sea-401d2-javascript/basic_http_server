'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = ['*.js', 'test/*.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', function() {
  return gulp.src(paths, {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function() {
  gulp.watch(paths, ['mocha', 'eslint']);
});

gulp.task('default', ['eslint', 'mocha', 'watch']);
