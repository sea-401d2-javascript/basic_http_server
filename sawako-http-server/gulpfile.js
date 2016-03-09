'use strict';
var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var paths = ['*.js', 'img/*.js'];


gulp.task('lint', function(){
  return gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

gulp.task('test', function(){
  return gulp.src('test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watcher', function(){
  gulp.watch( __dirname + '/**/*.js', ['lint', 'test']);
});
