// Gulp Config
// ---------------------------------------------------------

var gulp  = require('gulp');
var gutil = require('gulp-util');

var srcDir       = './src'
var srcJsDir     = srcDir + '/javascripts'
var srcCssDir    = srcDir + '/stylesheets'

var srcCoffeeDir  = srcJsDir + '/coffee'
var destCoffeeDir = srcJsDir

var destDir    = './build'
var destJsDir  = destDir + '/javascripts'
var destCssDir = destDir + '/stylesheets'


// Coffee Tasks
// ---------------------------------------------------------

// include plugins
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src([srcCoffeeDir + '/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(destCoffeeDir + '/'))
});


// Production Tasks
// ---------------------------------------------------------

// include plugins
var concat     = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify     = require('gulp-uglify');

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src([ srcJsDir + '/lib.js', srcJsDir + '/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(destJsDir + '/'));
});


// Default Gulp Task
// ---------------------------------------------------------

gulp.task('default', ['coffee', 'scripts'], function () {

  // watch the coffeescript dir
  gulp.watch(srcCoffeeDir + '/*.coffee', ['coffee']);

  // watch the coffeescript dir
  gulp.watch(srcJsDir + '/*.js', ['scripts']);
});
