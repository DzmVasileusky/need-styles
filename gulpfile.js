'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');

// styles developer's version
gulp.task('styles-dev', function() {
  return gulp.src('src/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'Android 3', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9'],
      cascade: false
    }))
    .pipe(rename('needstyles.css'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('dist/'));
});

// syles production version
gulp.task('styles-prod', ['styles-dev'], function() {
  return gulp.src('dist/needstyles.css')
    .pipe(csscomb())
    .pipe(gulp.dest('dist/'))
    .pipe(sourcemaps.init())
    .pipe(csso())
    .pipe(sourcemaps.write('/'))
    .pipe(rename('needstyles.min.css'))
    .pipe(gulp.dest('dist/'));
});

// default task
gulp.task('watch', function() {
  gulp.watch(['src/*.scss','src/modules/**/scss/*.scss'], ['styles-dev']);
});

gulp.task('default', [ 'styles-dev', 'styles-prod' ]);