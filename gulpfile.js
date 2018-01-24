var gulp = require('gulp');
var webserver = require('gulp-webserver');
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
      open: 'http://localhost:8000/content/',
      fallback: 'index.html'
    }));
});

gulp.task('scss', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('css', function() {
    gulp.src('css/**/*.css') 
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('StatesAssembly.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    gulp.start('webserver');
    gulp.watch('scss/**/*.scss', ['scss']); 
    gulp.watch('css/**/*.css', ['css']);    
});