var path = require('path');

const BUID_DIR = path.resolve(__dirname + "/dist");

module.exports = {
    mode: 'development',
    entry: {
        healthz: path.resolve(__dirname, './app/healthz/healthz.js'),
        admin: path.resolve(__dirname, './app/admin/index.js'),
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
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