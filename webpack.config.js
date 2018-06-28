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
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const fs = require('fs');

const webpackPwaMnifestConfig = JSON.parse(fs.readFileSync("src/webpack-pwa-manifest.json"));

const dotenvPath = process.env.ENVIRONMENT ?
    `./src/scripts/environment/${process.env.ENVIRONMENT}.env` :
    './src/scripts/environment/local.env';

console.log(`Using ${dotenvPath} to set environment vars`);
require('dotenv').config({path: dotenvPath});
console.log("BASE_URL:", process.env.BASE_URL);

module.exports = function (env = {}) {

    const isProductionMode = env.production === "production";

    return {

        entry: {
            main: './src/index.ts',
            criticalPath: './src/styles/critical-path.scss'
        },

        devServer: {
            contentBase: './src',
            historyApiFallback: true,
            port: 7000,
            hot: true,
            inline: true,
            noInfo: false,
            host: '127.0.0.1',
            disableHostCheck: true,
        },

        devtool: "source-map",

        module: {
            rules: [{
                test: /\.svg$/,
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
            publicPath: process.env.BASE_URL,
        }
    };
};

function getPlugins(isProductionMode) {
    const defaultPlugins = [
        new DashboardPlugin(),
        new BundleAnalyzerPlugin({analyzerMode: isProductionMode ? 'static' : 'server', defaultSizes: 'parsed'}),
        new webpack.DefinePlugin(isProductionMode ? {'process.env.NODE_ENV': JSON.stringify('production')} : {}),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.IgnorePlugin(/vertx/),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            watch: ['./src'],
        }),
        new Dotenv({
            path: dotenvPath,
            systemvars: true,
        }),
        new HtmlWebpackPlugin({
            title: webpackPwaMnifestConfig.name,
            template: "src/index.html",
            favicon: "src/assets/favicon.png",
            minify: true,
            excludeAssets: [/main.*\.css/, /criticalPath.*\.js/],
            inlineSource: '.(css)$',
            meta: {
                description: webpackPwaMnifestConfig.description
            }
        }),
        new WebpackPwaManifest(webpackPwaMnifestConfig),
        new HtmlWebpackExcludeAssetsPlugin(),
        new HtmlWebpackInlineSourcePlugin(),
        new InjectManifest({
            swSrc: "./src/sw-webpack-template.js",
            swDest: "sw.js",
            importWorkboxFrom: isProductionMode ? "local" : "cdn",
        }),
        new MiniCssExtractPlugin({
            filename: isProductionMode ? "[name].[hash:4].css" : "[name].css",
            chunkFilename: isProductionMode ? "[name].[hash:4].css" : "[name].css"
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
    ];

    if (isProductionMode) {
        return defaultPlugins.concat(
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin()
        );
    } else {
        return defaultPlugins.concat(
            new webpack.HotModuleReplacementPlugin(),
        )
    }
}