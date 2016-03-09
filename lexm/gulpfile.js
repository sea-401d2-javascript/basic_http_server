'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = ['*.js', 'test/*.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(lint())
    .pipe(lint.format());
});

var testPath = ['test/*.js'];

gulp.task('mocha', function() {
  return gulp.src(testPath, {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['lint', 'mocha']);

gulp.task('watch', function() {
  gulp.watch(paths, ['lint', 'mocha']);
});
