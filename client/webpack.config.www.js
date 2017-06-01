/**
 * Created by wubo on 2017/6/1.
 */
var fs = require("fs");
var webpack = require("webpack");
// var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
// var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackMd5HashPlugin = require("webpack-md5-hash");

var libs = [];
var packageJson = fs.readFileSync("package.json").toString();
var dependencies = JSON.parse(packageJson).dependencies;
for (var key in dependencies) {
    libs.push(key);
}

var config = {
    entry: {
        render: ["./src/render/render.jsx"],
        lib: libs
    },
    output: {
        // publicPath: "http://static-shequnpai-yp.duobeiyun.com/fe/",
        path: "./dist",
        filename: "scripts/[name]-[hash].js",
        chunkFilename: 'scripts/[name].[chunkhash].chunk.js',
    },
    resolve: {
        modulesDirectories: ["node_modules"]
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loader: ["babel"], exclude: /node_modules/, query: {presets: ["es2015", "react"]}},
            // {test: /\.less$/, loader: "style!css!less"},
            {test: /\.(css|less)/, loader: ExtractTextPlugin.extract('style', '!css!less')},
            {test: /\.(jpe?g|png|gif)$/, loader: "file?name=images/[hash:15].[ext]"}
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]-[hash].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            filename: "scripts/[name]-[hash].js"
        }),
        new HtmlWebpackPlugin({
            inject: "body",
            templateContent: fs.readFileSync("./src/index.html").toString(),
            filename: "../server/index.html",
            xhtml: true
        }),
        new WebpackMd5HashPlugin()
    ]
};

module.exports = config;