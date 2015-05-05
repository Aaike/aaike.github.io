/**
 * Lint js files to detect syntax errors or incorrect coding style.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('jshint', function () {
  return gulp.src(['./src/**/*.js', './test/**/*.js', './gulpfile.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(jshint.reporter('fail'))
    ;
});
