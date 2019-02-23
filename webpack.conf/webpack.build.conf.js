const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const notifier = require('node-notifier');

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    // plugins: []
})

notifier.notify({
        title: 'Build mode notifier',
        message: 'You are using build mode!',
        sound: false,
        wait: true // Wait with callback, until user action is taken against notification
    },
    function (err, response) {}
);

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
})
