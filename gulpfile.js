// Handy addons

// var jshint = require('gulp-jshint');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');

// *************************** IMPORTS ***********************************

// Basic tools
var gulp = require('gulp');
var open = require('gulp-open');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');
var minify = require('gulp-minify');

// for CSS
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var stripCssComments = require('gulp-strip-css-comments');
var sourcemaps = require('gulp-sourcemaps');

// for server
var lr = require('tiny-lr')();

var refresh = function(event) {
  var fileName = require('path').relative(__dirname, event.path);
  gutil.log.apply(gutil, [gutil.colors.magenta(fileName), gutil.colors.cyan('built')]);
  lr.changed({
    body: { files: [fileName] }
  });
}


// *************************** IMPORTS ***********************************



// **************************** CSS ******************************************

gulp.task('compile-sass', function() {
  return gulp.src(`assets/styles/master.sass`)
    .pipe(sass({indentedSyntax: true}))
    .pipe(rename({suffix: '.sass'}))
    .pipe(gulp.dest('public'));
});

gulp.task('concat-css',['compile-sass'], function() {
  return gulp.src([
    'public/master.sass.css',
    'bower_components/sweetalert/dist/sweetalert.css',
  ])
  .pipe(concat('master.css'))
  .pipe(gulp.dest('public'));
});

gulp.task('minify-css',['compile-sass', 'concat-css'], function() {
  return gulp.src('public/master.css')
  .pipe(rename({suffix: '.min'}))
  .pipe(stripCssComments())
  .pipe(cssnano())
  .pipe(gulp.dest('public'));
});

// **************************** CSS *******************************************




// **************************** JS  *******************************************

gulp.task('concat-js', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/sidr/dist/jquery.sidr.min.js',
      'bower_components/scrollreveal/dist/scrollreveal.min.js',
      'bower_components/sweetalert/dist/sweetalert.min.js',
      'js/*.js'
    ])
    .pipe(concat('master.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('minify-js', ['concat-js'], function() {
  return gulp.src('public/master.js')
  .pipe(minify({
      ext: {
          src:'.js',
          min:'.min.js'
      }
  }))
  .pipe(gulp.dest('public'));
});

// **************************** JS  *******************************************

// **************************** GULP TASKS  ***********************************

gulp.task('serve', function () {
  //var express = require('express');
  //var app = express();
  //app.use(require('connect-livereload')());
  //app.use(express.static(`${__dirname}/public`));
  //app.listen(3000);
  lr.listen(35729);
});

gulp.task('cleanup',['minify-css', 'minify-js'], function() {
  del('public/master.js');
  del('public/master.css');
  del('public/master.sass.css');
});

gulp.task('styles', ['compile-sass', 'concat-css', 'minify-css']);
gulp.task('scripts', ['concat-js', 'minify-js']);
gulp.task('default', ['styles', 'scripts', 'cleanup', 'serve', 'watch']);

gulp.task('watch', function() {
  gulp.watch(`sass/*.sass`, ['styles', 'cleanup']);
  gulp.watch(['bower_components/*', 'js/*.js'], ['scripts', 'cleanup']);
  gulp.watch(['public/master.html', 'public/master.min.js', 'public/master.min.css'], refresh);
});
