var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var psi = require('psi');
var site = "http://meedan.com";
var w3cjs = require('gulp-w3cjs');

gulp.task('bundle-svg', function () {
  // SVG files get special handling
  gulp.src('source/images/vector/*.svg')
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest('source/images/vector/'))
});

gulp.task('pagespeed', function () {
  return psi(site, {
    nokey: 'true',
    strategy: 'mobile',
  }, function (err, data) {
    console.log(data.score);
    console.log(data.pageStats);
  });
});

// HTML Validator
gulp.task('validate', function () {
  gulp.src(['build/*.html', '!build/_*.html'])
    .on('error', handleErrors)
    .pipe(w3cjs());
});