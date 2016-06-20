'use strict';

var path = require('path');
var webpack = require('webpack');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

var isProduction = process.env.NODE_ENV === 'production';

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
    }),
    new StringReplacePlugin(),
    new WebpackBuildNotifierPlugin()
];

if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

module.exports = {
    entry: './assets/scripts/app.js',
    output: {
        path: path.join(__dirname, 'dist/scripts'),
        publicPath: 'dist/scripts',
        filename: 'app.js'
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader', exclude: /node_modules/ },
            { test: /\.hbs$/, include: path.resolve('./assets/scripts/templates'), loader: StringReplacePlugin.replace({
                replacements: [
                    {
                        pattern: /(<\\\s*)(.*)(\s*\/>)/g,
                        replacement: function (match, p1, p2, p3, p4) {
                            return "{{{component " + p2 + "}}}";
                        }
                    }
                ]}), exclude: /node_modules/ },

        ]
    },
    plugins: plugins
};
