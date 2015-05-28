var gulp = require('gulp');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var config = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('sass', function () {
  return gulp.src(config.sass.src)
    .pipe(debug(config.markup.src))
    .pipe(sass(config.sass.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer("last 4 versions", "> 1%"))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
})