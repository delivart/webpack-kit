const path = require('path');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PATHS = {
    src: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../production'),
    assets: 'assets/'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].min.js`,
        path: PATHS.build,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtactPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: { path: `${PATHS.src}/js/postcss.config.js` }
                    }
                }
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtactPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'postcss-loader',
                    options: { 
                        sourceMap: true, 
                        config: { path: `${PATHS.src}/js/postcss.config.js` } 
                    }
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                    
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtactPlugin({
            filename: `${PATHS.assets}css/[name].min.css`,
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/images`, to: `${PATHS.assets}images` },
            { from: `${PATHS.src}/static`, to: '' },
        ])
    ]
}
