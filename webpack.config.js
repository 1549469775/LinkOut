const path = require("path")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback')
module.exports = {
  // 默认生产模式，开发模式不会被压缩
  mode: "production",
  // 入口，简写的话是main的简写
  // entry: {
  //   main: "./src/main.js"
  // },
  entry: ["./src/main.js"],
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
  // devServer: {
  //   // 告诉服务器从哪里提供内容。
  //   contentBase: path.resolve(__dirname, "dist"),
  //   // 解决Cannot get /
  //   //目的是路由改变时回到index.html寻找
  //   historyApiFallback: true
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname + '/src'),
      'ui': path.resolve(__dirname + '/src/components'),
      'views': path.resolve(__dirname + '/src/views'),
      'assets': path.resolve(__dirname + '/src/assets'),
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
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      }, {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: 'static/[name]-[hash].[ext]'
          }
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
  /**
   * devtool 调试工具，用来追踪被打包前源文件的错误
   * 关闭可减少打包文件的大小
   */
  // devtool: 'inline-source-map',
  plugins: [
    /**
     * 由 webpack 生成的文件或目录才能被 CleanWebpackPlugin 删除
     * 下面配置的是 打包前 需要被删除的目录
     */
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      '_': 'lodash'
    }),
    // 该插件可以对源地图生成进行更细粒度的控制。它也可以通过devtool配置选项的某些设置自动启用。
    new webpack.SourceMapDevToolPlugin({
      filename: 'js/[name].js.map',
      // exclude: ['vendor.js']
    }),

    /**
     * 打包HTML
     */
    new HtmlWebpackPlugin({
      title: "App",
      /**
       * template 指定要打包的原文件
       */
      template: path.resolve(__dirname, 'public', "index.html")
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '/css/[name].css',
      chunkFilename: '/css/[id].css',
    }),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 模块热替换插件(hmr)永远不要在生产环境(production)下启用 HMR
    new webpack.HotModuleReplacementPlugin({multiStep:true}),
    // Use NoErrorsPlugin for webpack 1.x
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    new webpack.NoEmitOnErrorsPlugin(),
    // 浏览器同步插件
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: '',
      server: {
        //指定服务器启动根目录
        baseDir: './dist',
        // 加了这个插件，解决路由改变时Cannot Get /的错误
        middleware: [historyApiFallback()]
      }
    })
  ],
  // 通过这些选项，您可以控制webpack如何通知您超出特定文件限制的资产和入口点
  //性能
  //去除某警告
  performance: {
    // 打开/关闭提示
    hints: "warning",
    // 此选项控制webpack何时根据单个资产大小发出性能提示
    maxAssetSize: 100000, // 整数类型（以字节为单位）30000000
    // 此选项控制webpack何时应根据最大入口点大小发出性能提示。
    maxEntrypointSize: 250000, // 整数类型（以字节为单位）50000000
    // 此属性允许webpack控制用于计算性能提示的文件
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  optimization: {
    /**
     * 分包
     */
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,

    },

    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        /**
         *  sourceMap 和 devtool: 'inline-source-map', 冲突
         */
        sourceMap: false, // set to true if you want JS source maps,
        /**
         *  extractComments 导出备注
         */
        extractComments: 'all',
        chunkFilter: (chunk) => {
          // Exclude uglification for the `vendor` chunk
          if (chunk.name === 'vendor') {
            return false;
          }

          return true;
        }
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}