const { DefinePlugin } = require("webpack");
const path = require("path");
const packageJson = require('./package.json');

module.exports = {
  entry: {
    app: path.join(__dirname, "src/components/App.tsx"),
    background: path.join(__dirname, "src/background.ts"),
    process_page_event_once: path.join(__dirname, "src/scripts/process-page-event-once.script.ts")
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
    }),
  ],
};
