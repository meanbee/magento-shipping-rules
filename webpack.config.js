/* global module:false */
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
    resolve: {
        extensions: ['', '.js', '.json']
    }
};