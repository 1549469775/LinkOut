const path = require("path")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // 默认生产模式，开发模式不会被压缩
  mode: "production",
  // 入口，简写的话是main的简写
  // entry: {
  //   main: "./src/main.js"
  // },
  entry:["./src/main.js","webpack-hot-middleware/client?quiet=true"],
  // 出口
  output: {
    // 用于输出文件的文件名chunkhash
    filename: 'js/[name].[hash:4].js',
    // 目标输出目录 path 的绝对路径。
    path: path.resolve(__dirname, "dist"),
    // 插入的script会变成这样子：<script src="assets/b.js"></script>
    // publicPath:"/assets/"
    // 建议发布的时候再改
    // publicPath:"/"
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    // 解决Cannot get /
    //目的是路由改变时回到index.html寻找
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@': __dirname + '/src',
      'ui': __dirname + '/src/components',
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false, // 不采用.babelrc的配置
            presets: ['@babel/preset-env'],
            plugins: [
              "dynamic-import-webpack"
            ]
          }
        }
      }, {
        test: /\.jpg$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // 将 JS 字符串生成为 style 节点
        }, {
          loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
          loader: "sass-loader", // 将 Sass 编译成 CSS
          options: {
            // 你也可以从一个文件读取，例如 `variables.scss`
            data: `
                  @import "@/assets/styles/_global.scss";
                `
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      '_': 'lodash'
    }),
    new HtmlWebpackPlugin({
      title: "App",
      template: path.resolve(__dirname, 'public', "index.html")
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
  //去除某警告
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
}