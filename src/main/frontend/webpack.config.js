var path = require('path');

const BUID_DIR = path.resolve(__dirname + "/dist");

module.exports = {
    mode: 'development',
    entry: {
        "default_error": path.resolve(__dirname, './app/errors/DefaultErrorPage.js'),
        "404_error": path.resolve(__dirname, './app/errors/400ErrorPage.js'),
        "400_error": path.resolve(__dirname, './app/errors/404ErrorPage.js'),
        "500_error": path.resolve(__dirname, './app/errors/500ErrorPage.js'),
        "admin": path.resolve(__dirname, './app/admin/index.js')
    },
    resolve: {
        extensions: ['.tsx', '.ts', ".js", ".jsx"]
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules$/,
            },
            {
                test: path.join(__dirname, "."),
                exclude: path.resolve(__dirname, "node_modules"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }

            }
        ]
    },
    output: {
        filename: 'asset/[name]_bundle.js',
        publicPath: "/",
        path: BUID_DIR
    }
};