const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        // clean: true,
    },
    devtool: 'eval',
    devServer: {
        static: './dist'
    },
};
