const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'eval-source-map',
    devServer: {
        static: './dist',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            // test: /\.css$/i,
            // use: ['x-loader', 'y-loader']
        ],
    },
};

// https://webpack.js.org/guides/output-management/
// htmlwebpackplugin

// https://github.com/shellscape/webpack-manifest-plugin
// check what files are needed so they aren't cleaned via output: clean: true