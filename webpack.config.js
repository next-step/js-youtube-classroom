const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

module.exports = {
  mode: "development",
  entry: "./src/js/index.ts",
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
      "process.env": dotenv.parsed,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/public",
    host: "localhost",
    overlay: true,
    port: 8080,
  },
};

// index.html 파일이 제대로 server가 안되네!
