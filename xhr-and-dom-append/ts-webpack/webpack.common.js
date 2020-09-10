const path = require("path");

const fileLoaderOpt = {
  regExp: /src\/(.+)\/[^/]+\.[^/]+$/,
  name: "[1]/[name].[ext]",
};

module.exports = {
  entry: {
    bundle: "src/kaizen.ts",
  },
  resolve: {
    modules: [path.resolve(__dirname), "node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader", options: { cacheDirectory: true } },
          { loader: "ts-loader" },
          { loader: "eslint-loader", options: { cache: true } },
        ],
      },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jp(e)?g|gif|ico|svg)$/i,
        use: [{ loader: "file-loader", options: fileLoaderOpt }],
      },
    ],
  },
  optimization: {
    moduleIds: "hashed",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "kaizen.js",
  },
};
