const { DefinePlugin } = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new DefinePlugin({
      VERBOSE: false,
    }),
  ],
});
