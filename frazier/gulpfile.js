var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
// var fs = require('fs');

var lintPaths = [__dirname + '/lib/*.js', __dirname + '/test/*.js'];
var testPaths = [__dirname + '/test/*.js'];


gulp.task('eslint', function(){  
  return gulp.src(lintPaths)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', ['eslint'], function(){
  gulp.src(testPaths)
  .pipe(mocha());
});

gulp.task('watch', function(){
  gulp.watch(lintPaths, ['test']);
});
