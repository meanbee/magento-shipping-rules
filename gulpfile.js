/* global require:false, process:false */
'use strict';
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    concat       = require('gulp-concat'),
    gutil        = require('gulp-util'),
    nativejsx    = require('gulp-nativejsx'),
    sourcemaps   = require('gulp-sourcemaps'),
    stylus       = require('gulp-stylus'),
    // uglify       = require('gulp-uglify'),
    spawn        = require('child_process').spawn;

gulp.task('test', ['test:php']);

gulp.task('test:php', function (done) {
    let child = spawn('phpunit', [], { cwd: process.cwd() }),
        stdout = '';
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        stdout += data;
    });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        stdout += gutil.colors.red(data);
    });
    child.on('close', function (code) {
        gutil.log(stdout);
        if (code !== 0) done('error');
    })
});

gulp.task('scripts', function() {
    return gulp.src([
        'node_modules/gulp-nativejsx/node_modules/nativejsx/dist/jsxdom-prototypes.js',
        'node_modules/popper.js/build/popper.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/polyfills.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/util.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Register.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Register/*.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Base.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Aggregator.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Aggregator/*.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Term.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Term/*.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Condition.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Condition/*.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Comparator.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Comparator/*.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Field.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Field/*.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/History.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Clipboard.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/Navigation.js',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/init.js',
        '!src/skin/adminhtml/base/default/js/meanbee/shippingrules/script.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(nativejsx())
    .pipe(concat('script.js'))
    // .pipe(uglify())
    // .pipe(sourcemaps.write('.'))
    .on('error', function () {
        this.emit('end');
    })
    .pipe(gulp.dest('src/skin/adminhtml/base/default/js/meanbee/shippingrules'));
});

gulp.task('stylus', function () {
    return gulp.src([
        'src/skin/adminhtml/base/default/css/meanbee/shippingrules/application.styl'
    ])
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/skin/adminhtml/base/default/css/meanbee/shippingrules'))
});

gulp.task('watch', ['stylus', 'scripts'], function() {
    return gulp.watch([
        'src/skin/adminhtml/base/default/css/meanbee/shippingrules/*.styl',
        'src/skin/adminhtml/base/default/js/meanbee/shippingrules/*.js',
        '!src/skin/adminhtml/base/default/js/meanbee/shippingrules/script.js'
    ], ['stylus', 'scripts']);
});

gulp.task('default', ['watch']);
