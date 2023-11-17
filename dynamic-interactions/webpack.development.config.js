const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: "./src",
            watch: true,
        },
        liveReload: true,
        compress: true,
    },
});
