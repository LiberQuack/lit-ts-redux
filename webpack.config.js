const os = require('os');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const DashboardPlugin = require('webpack-dashboard/plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = function (env = {}) {

    const isProductionMode = env.production === "production";

    return {
        entry: './src/index.ts',

        devServer: {
            contentBase: './src',
            historyApiFallback: true,
            port: 7000,
            hot: true,
            inline: true,
            noInfo: false,
            host: '0.0.0.0',
            disableHostCheck: true,
        },

        devtool: isProductionMode ? "source-map" : "eval-source-map",

        module: {
            rules: [{
                test: /\.(html|svg)$/,
                use: ['raw-loader']
            }, {
                test: /(\.(js|ts)$)/,
                use: [{
                    loader: 'cache-loader',
                }, {
                    loader: 'thread-loader',
                    options: {
                        workers: Math.max(os.cpus().length, 1)
                    }
                }, {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true,
                        transpileOnly: true,
                    }
                }].filter(it => isProductionMode ? it.loader !== 'cache-loader' : true)
            }, {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            }, {
                test: /\.scss$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader?sourceMap=true",
                    "resolve-url-loader",
                    "sass-loader?sourceMap=true"
                ]
            }]
        },

        plugins: getPlugins(isProductionMode),

        mode: isProductionMode ? 'production' : 'development',

        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['src', 'node_modules'],
        },

        output: {
            chunkFilename: isProductionMode ? "[name]-chunk.[hash:4].js" : "[name]-chunk.js",
            filename: isProductionMode ? "[name].[hash:4].js" : "[name].js",
            publicPath: "/lit-ts-redux/" //TODO: Use .env files BASE_URL
        }
    };
};

function getPlugins(isProductionMode) {
    const defaultPlugins = [
        new DashboardPlugin(),
        new BundleAnalyzerPlugin({analyzerMode: isProductionMode ? 'static' : 'server', defaultSizes: 'parsed'}),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.IgnorePlugin(/vertx/),
        new HtmlWebpackPlugin({template: "src/index.html"}),
        new Dotenv({
            path: process.env.ENVIRONMENT ? `./src/scripts/environment/${process.env.ENVIRONMENT}.env` : './src/scripts/environment/local.env',
            systemvars: true,
        }),
        new webpack.DefinePlugin(isProductionMode ? {'process.env.NODE_ENV': JSON.stringify('production')} : {}),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            watch: ['./src'],
        }),
        new MiniCssExtractPlugin({
            filename: isProductionMode ? "[name].[hash:4].css" : "[name].css",
            chunkFilename: isProductionMode ? "[name].[hash:4].css" : "[name].css"
        }),
    ];

    if (isProductionMode) {
        return defaultPlugins.concat(
            new UglifyJsPlugin({uglifyOptions: {dead_code: true,}}),
            new FaviconsWebpackPlugin('assets/favicon.png'),
        )
    } else {
        return defaultPlugins.concat(
            new webpack.HotModuleReplacementPlugin(),
        )
    }
}