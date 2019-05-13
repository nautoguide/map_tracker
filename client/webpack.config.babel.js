const path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['whatwg-fetch','babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                use: {
                    loader:'babel-loader'
                },
                test: /.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: []
};