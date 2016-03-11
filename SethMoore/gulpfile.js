'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var paths = ['*.js', 'test/*.js', '!package.json'];

gulp.task('eslint', function() {
  return gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('./test/*.js')
  .pipe(mocha());
});
// When gulp is run, the default task runs but stays in the process. How do I have it run and exit?
gulp.task('default', ['eslint', 'mocha']);
