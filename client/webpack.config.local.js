let webpack = require("webpack");
let path = require('path');

let config = {
    entry: "./src/app.js",
    output: {
        publicPath: "http://127.0.0.1:9090/dist/",
        path: path.join(__dirname, 'dist'),
        chunkFilename: 'scripts/[name].chunk.js',
        filename: "scripts/render.js",
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015"],
                exclude: /node_modules/
            },
            {test: /\.less$/, loader: "style!css!less"},
            {test: /\.(jpe?g|png|gif)$/, loader: "file-loader?name=images/[name].[ext]"}
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
    ]
};

module.exports = config;