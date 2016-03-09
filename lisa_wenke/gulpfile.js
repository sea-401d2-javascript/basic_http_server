'use strict';


var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = ['test/*.js', 'tcp-server.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(lint())
    .pipe(lint.format());
});


gulp.task('mocha', function(){
  return gulp.src(paths)
    .pipe(mocha({}));

});

gulp.task('default', ['lint', 'mocha']);
