const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const cssLoaders = extra => {
   const loaders = [MiniCssExtractPlugin.loader,'css-loader']

    if(extra) {
        loaders.push(extra)
    }

    return loaders

}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ]
    }

    if(preset) {
        opts.presets.push(preset)
    }

    return opts
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.jsx',
        analytics: './analytics.ts'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', 'json', 'jpg'],
        alias: {
          '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev && 'source-map',
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:
            [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
                ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader') //[MiniCssExtractPlugin.loader,'css-loader', 'less-loader'] //loaders читаются справа налево
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader') //[MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'] //loaders читаются справа налево
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                // use: ['file-loader']
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.m?ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}

//npm install -D babel-loader @babel/core @babel/preset-env webpack
//npm install -D @babel/preset-typescript
//npm install -D @babel/preset-react
//npm i react react-dom

