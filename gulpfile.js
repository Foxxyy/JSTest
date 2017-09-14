var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var htmlmin     = require('gulp-html-minifier');
var htmlclean   = require('gulp-htmlclean');

gulp.task('hello', function() {
  console.log('Hello');
});

gulp.task('less', function() {
  return gulp.src("app/less/*.less")
    .pipe(less())
    //.pipe(concat('build.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('browser-sync', function () {
  var files = [
    'app/css/*.css',
    'app/*.html',
    'dist/css/*.css',
    'dist/*.html',
    'dist/js/*.js'
  ];

browserSync.init(files, {
  server: {
    baseDir: './dist'
  }
});
});

gulp.task('minify', function() {
  var options = {
      compress: true
  };
  return gulp.src('./app/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(htmlclean())
    .pipe(gulp.dest('./dist'))
});

gulp.watch('app/less/*.less', ['less']);
gulp.watch('app/*.html', ['minify']);

gulp.task('default', ['less', 'minify', 'browser-sync']);
