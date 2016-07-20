/* global module:false */
var argv    = require('yargs').argv,
    webpack = require('webpack');

module.exports = {
    devtool: '#source-map',
    entry: [
        './src/skin/adminhtml/base/default/js/meanbee/shippingrules/init.js'
    ],
    output: {
        filename: 'script.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    'presets': ['es2015', 'react']
                }
            }
        ]
    },
    plugins: {
        'PROD': [
            new webpack.optimize.UglifyJsPlugin({minimize: true})
        ],
    }[(argv.env || process.env.NODE_ENV).toUpperCase()] || [],
    resolve: {
        extensions: ['', '.js', '.json']
    }
};