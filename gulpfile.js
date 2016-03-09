'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');

var lintPath = [__dirname + '/test/*.js', __dirname + '/server.js'];

gulp.task('eslint', ()=>{
  return gulp.src(lintPath)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', ()=>{
  gulp.src(__dirname + '/test/*.js')
  .pipe(mocha());
});

gulp.task('default', ['eslint', 'test']);
