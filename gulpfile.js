var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
    root: ['content', 'dist'],
    livereload: true,
    port: 8111
  });
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
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('scss'));
  gulp.watch('css/**/*.css', gulp.series('css'));
});

gulp.task('default', gulp.parallel('webserver', 'watch'));