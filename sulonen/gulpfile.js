'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var paths = ['gulpfile.js', 'lib/*.js', 'test/*.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', function() {
  return gulp.src(paths)
  .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(['lib/**', 'test/**'], ['test', 'lint']);
});

gulp.task('default', ['lint', 'test']);
