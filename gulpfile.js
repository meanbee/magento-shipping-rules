var gulp       = require('gulp'),
    babel      = require('gulp-babel'),
    concat     = require('gulp-concat'),
    nativejsx  = require('gulp-nativejsx'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src(['src/js/*.js', '!src/js/script.js', 'node_modules/gulp-nativejsx/node_modules/nativejsx/dist/jsxdom-prototypes.js'])
             .pipe(sourcemaps.init())
             .pipe(babel())
             .pipe(nativejsx())
             .pipe(concat('script.js'))
             .pipe(uglify())
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest('src/js'));
});

gulp.task('watch', function() {
  return gulp.watch(['src/js/*.js', '!src/js/script.js'], ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);
