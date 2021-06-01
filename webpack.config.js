const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /(\.css$)/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/js"),
    },
    modules: [path.join(__dirname, "src/js"), "node_modules"],
    extensions: [".js", ".ts", ".json"],
  },
  target: "web",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public/index.html"),
      inject: false,
    }),
  ],
};
