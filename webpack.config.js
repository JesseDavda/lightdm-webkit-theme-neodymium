const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    module: {
        rules: [
            { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(js)$/, use:'babel-loader' },
            { test: /\.coffee$/, use: 'coffee-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html'
        }),
    ],
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000, 
    }
}