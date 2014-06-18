// Gulp Config
// ---------------------------------------------------------

var gulp  = require('gulp');
var gutil = require('gulp-util');

var sourceDir   = './src'
var sourceJsDir = sourceDir + '/scripts'

var destDir   = './build'
var destJsDir = destDir + '/scripts'


// Coffee Tasks
// ---------------------------------------------------------

// include plugins
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src([sourceJsDir + '/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(destJsDir + '/'))
});



// Production Tasks
// ---------------------------------------------------------

// include plugins
var concat     = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify     = require('gulp-uglify');

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});
