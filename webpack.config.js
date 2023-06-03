const CompressionPlugin = require("compression-webpack-plugin");
plugins: [
  new HtmlWebpackPlugin({
    template: "public/index-prod.html",
  }),
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    filename: "[path][query]",
    algorithm: "gzip",
    deleteOriginalAssets: false,
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
];
