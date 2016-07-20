/* global require:false, process:false, __dirname:false */
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil        = require('gulp-util'),
    sourcemaps   = require('gulp-sourcemaps'),
    stylus       = require('gulp-stylus'),
    spawn        = require('child_process').spawn,
    webpack      = require('webpack-stream'),
    KarmaServer  = require('karma').Server;

gulp.task('test', ['test:php', 'test:js']);

gulp.task('test:php', function (done) {
    var child = spawn('phpunit', ['--colors=always'], { cwd: process.cwd() }),
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
    });
});

gulp.task('test:js', ['scripts'], function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('scripts', function() {
    return gulp.src(['src/skin/adminhtml/base/default/js/meanbee/shippingrules/init.js'])
    .pipe(webpack(require('./webpack.config')))
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
