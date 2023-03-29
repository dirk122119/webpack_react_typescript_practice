const path = require("path");

module.exports = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
//   mode:'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 將 CSS 添加到 DOM 中
          'style-loader',
          // 解析 CSS 中的 `@import` 和 `url()`
          'css-loader',
          // 將 Sass 轉換為 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js",".jsx"],
  },
  devServer: {
    static: "./dist",
    // historyApiFallback: true,
    compress: true,
    port: 9000,
  },
  output: {
    filename: "boundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
};
