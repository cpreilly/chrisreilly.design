
var gulp = require('gulp');
var sync = require('browser-sync').create();
var reload = sync.reload;

var notify = require('gulp-notify');

var stylus = require('gulp-stylus');

var sourcemaps = require('gulp-sourcemaps');

var path = require('path');
var fs = require('fs');

gulp.task('stylus', function() {

  gulp.src('sty/style.styl')

    .pipe(sourcemaps.init())
    .pipe(stylus()
    .on('error', notify.onError(function(error) {
      return {title: "Stylus error: " + error.name, message: error.message, sound: 'Pop' };
    })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(sync.stream());
});


gulp.task('sync', function() {
  sync.init({
    notify: false,
    open: false,
    server: {
      baseDir: './',
    },
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    scrollProportionally: false,
    scrollRestoreTechnique: 'cookie'
  });

  gulp.watch('sty/**/*.styl', ['stylus']);
  gulp.watch('**/*.html').on("change", reload);

});


