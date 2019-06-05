var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      port: 8111,
      open: 'http://localhost:8111/content/',
      fallback: 'index.html'
    }));
});

gulp.task('scss', function() {
  return gulp.src('scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('css', function() {
  return gulp.src('css/**/*.css') 
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('StatesAssembly.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    gulp.watch('scss/**/*.scss', gulp.series('scss'));
    gulp.watch('css/**/*.css', gulp.series('css'));
});