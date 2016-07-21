/* global module:false, require:false, process:false */
var argv = require('yargs').argv;
module.exports = function (config) {
    config.set({
        basePath: '.',
        browsers: {
            IDE: ['PhantomJS']
        }[(argv.env || process.env.NODE_ENV).toUpperCase()] || ['Chrome', 'Firefox', 'Safari', 'PhantomJS', 'Opera'],
        client: {
            clearContext: false
        },
        customContextFile: 'tests/context.html',
        files: [
            'src/skin/adminhtml/base/default/js/meanbee/shippingrules/script.js',
            'tests/**/*.js',
            { pattern: 'tests/ajax/**/*', included: false, watched: false }
        ],
        frameworks: ['qunit'],
        logLevel: config.LOG_ERROR,
        plugins: [
            require('karma-qunit'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-opera-launcher')
        ],
        proxies: {
            '/ajax/': '/base/tests/ajax/'
        }
    })
};