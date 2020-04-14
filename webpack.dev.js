const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports  = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules : [
      {
        test: /(.js|.jsx)$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader?modules'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          {
            loader: require.resolve('css-loader'),
            options: {
                // importLoaders: 1,
                // 改动
                // modules: true,   // 新增对css modules的支持
                // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
            },
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          },
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin({})
  ],
  devServer: {
    hot: true,
    port: 9966
  }
}