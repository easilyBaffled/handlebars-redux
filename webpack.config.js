'use strict';

var path = require('path');
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV === 'production';

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
    })
];

if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

module.exports = {
    entry: './assets/scripts/app.js',
    output: {
        path: __dirname,
        filename: 'dist/scripts/app.js'
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader', exclude: /node_modules/ }
        ]
    },
    plugins: plugins
};
