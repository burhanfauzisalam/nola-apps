const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./services/app.js",
  output: {
    path: path.resolve(__dirname, "development"),
    filename: "file-[contenthash].js",
    assetModuleFilename: "img/[name]-[contenthash][ext][query]",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "template.html",
    }),
    new Dotenv(),
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
