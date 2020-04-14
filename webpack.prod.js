const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports  = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name]_[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules : [
      {
        test: /(.js|.jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules',
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
          }
        ]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
            loader: 'postcss-loader',
            // options: {
            //   plugins: () => {
            //     require('autoprefixer')({
            //       overrideBrowserslist: ['last 3 version', '>1%', 'ios 3']
            //     })
            //   }
            // }
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]:[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'aa.html',
      inject: true,
      inlineSource: '.css$',
      chunks: ['vendors'],
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]__[contenthash:6].css"
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}