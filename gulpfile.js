// Gulp Config
// ---------------------------------------------------------

var gulp  = require('gulp');
var gutil = require('gulp-util');

var srcDir       = './src'
var srcJsDir     = srcDir + '/javascripts'
var srcCssDir    = srcDir + '/stylesheets'

var srcCoffeeDir  = srcDir + '/coffee'
var destCoffeeDir = srcJsDir

var destDir    = './build'
var destJsDir  = destDir + '/javascripts'
var destCssDir = destDir + '/stylesheets'


// Live Reload
// ---------------------------------------------------------

var livereload = require('gulp-livereload');


// Haml Tasks
// ---------------------------------------------------------

var haml = require('gulp-haml');

gulp.task('haml', function() {
  gulp.src(srcDir + '/*.haml')
    .pipe(haml())
    .pipe(gulp.dest(destDir))
});


// Coffee Tasks
// ---------------------------------------------------------

var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src([srcCoffeeDir + '/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(destCoffeeDir + '/'))
});


// Browserify Tasks
// ---------------------------------------------------------

var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var reactify   = require('reactify');

gulp.task('browserify', function() {
  return browserify(srcCoffeeDir + '/app.coffee')
    .transform({ extensions: 'coffee' }, reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(destJsDir + '/'))
});




// Production Tasks
// ---------------------------------------------------------

var concat     = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify     = require('gulp-uglify');

gulp.task('scripts', function() {
  gulp.src([ srcJsDir + '/lib.js', srcJsDir + '/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(destJsDir + '/'))
    .pipe(livereload());
});


// Default Gulp Task
// ---------------------------------------------------------

gulp.task('default', ['haml', 'coffee', 'scripts'], function () {

  // watch the coffeescript dir
  gulp.watch(srcCoffeeDir + '/*.coffee', ['coffee']);

  // watch the js dir
  gulp.watch(srcJsDir + '/*.js', ['scripts']);

  // watch the haml files
  gulp.watch(srcDir + '/*.haml', ['haml']);
});
