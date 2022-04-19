var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUID_DIR = path.resolve(__dirname + "../../../../target/classes/static");

module.exports = {
    mode: 'development',
    entry: {
        admin: path.resolve(__dirname, './app/admin/index.js'),
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['admin'],
            filename: "../templates/secure/admin.html",
            template: path.resolve(__dirname, "../resources/templates/template.html")
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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