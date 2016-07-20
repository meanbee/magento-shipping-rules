/* global module:false, require:false */
module.exports = function (config) {
    config.set({
        basePath: '.',
        browsers: ['PhantomJS'],
        customContextFile: 'tests/context.html',
        files: [
            'src/skin/adminhtml/base/default/js/meanbee/shippingrules/script.js',
            'tests/**/*.js',
            { pattern: 'tests/ajax/**/*', included: false, watched: false }
        ],
        frameworks: ['qunit'],
        plugins: [
            require('karma-qunit'),
            require('karma-phantomjs-launcher')
        ],
        proxies: {
            '/ajax/': '/base/tests/ajax/'
        }
    })
};