const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback')
module.exports = {
    // 入口文件
    entry: {
        main: './src/main.js'
    },
    // 输出文件
    output: {
        // js文件输出的目录与文件名字
        filename: 'js/[name].[hash].js',
        // 输出路径
        path: path.resolve(__dirname, "dist"),
    },
    // 配置模块的解析方式。例如，import 'lodash'在ES2015中调用时，resolve选项可以更改webpack寻找的位置'lodash'
    resolve: {
        // 更轻松地创建别名import或require某些模块。例如，为一堆常用src/文件夹添加别名：
        // https://webpack.js.org/configuration/resolve/#resolvealias
        alias: {
            '@': path.resolve(__dirname + '/src'),
            'ui': path.resolve(__dirname + '/src/components'),
            'views': path.resolve(__dirname + '/src/views'),
            'assets': path.resolve(__dirname + '/src/assets'),
        }
    },
    plugins: [
        /**
         * 由 webpack 生成的文件或目录才能被 CleanWebpackPlugin 删除
         * 下面配置的是 打包前 需要被删除的目录
         */
        new CleanWebpackPlugin(['dist']),
        // vue的插件
        new VueLoaderPlugin(),
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
        // Use modules without having to use import/require
        // 自动加载
        // identifier: ['module1', 'property1'],
        new webpack.ProvidePlugin({
            '_': 'lodash'
        }),
        // 该插件可以对源地图生成进行更细粒度的控制。它也可以通过devtool配置选项的某些设置自动启用。
        // new webpack.SourceMapDevToolPlugin({
        //     filename: 'js/[name].js.map',
        //     // exclude: ['vendor.js']
        // }),
        // 此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持CSS和SourceMaps的按需加载。
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '/css/[name].css',
            chunkFilename: '/css/[id].css',
        }),
        // https://webpack.js.org/plugins/internal-plugins/#optimize
        // 按出现顺序排列模块和块。这节省了空间，因为经常引用的模块和块会变小。
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 模块热替换插件(hmr)永远不要在生产环境(production)下启用 HMR
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
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
    module: {
        // https://webpack.js.org/configuration/module/#ruleuse
        rules: [{
                // js文件模块解析方式，采用es6转es5方式
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false, // 不采用.babelrc的配置
                        presets: ['@babel/preset-env'],
                        plugins: [
                            // 插件，使得可以使用import('')方式动态加载
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                }
            },
            {
                // 文件解析
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        //   输出目录与名字
                        name: 'static/[name]-[hash].[ext]'
                    }
                }
            },
            {
                //   vue文件模块的解析
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                //   css文件解析方式
                test: /\.css$/,
                use: [
                    // 这些加载器将从右到左应用（从最后到第一个配置）
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
                //   scss文件解析方式
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
    resolve: {
        alias: {
            '@': path.resolve(__dirname + '/src'),
            'ui': path.resolve(__dirname + '/src/components'),
            'views': path.resolve(__dirname + '/src/views'),
            'assets': path.resolve(__dirname + '/src/assets'),
        }
    },
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
//   优化
  optimization: {
    /**
     * 分包
     */
    // 默认情况下，webpack v4 +为动态导入的模块提供了开箱即用的新常见块策略。
    splitChunks: {
        // 这表示将选择哪些块进行优化。有效值为all，async和initial
      chunks: 'all',//all可以特别强大，因为这意味着即使在异步和非异步块之间也可以共享块。
      minSize: 30000,//要生成的块的最小大小（以字节为单位）
      maxSize: 0,

    },
    // 允许您通过提供不同的一个或多个自定义TerserPlugin实例来覆盖默认最小化器。
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