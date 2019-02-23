const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const notifier = require('node-notifier');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.build,
        port: 8081,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});

notifier.notify({
        title: 'Dev mode notifier',
        message: 'You are using dev mode! May the force be with you!',
        sound: false,
        wait: false,
        timeout: 5
    },
    function (err, response) {}
);

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
})
