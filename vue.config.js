const { externalsData, getExternalModules } = require('./src/externalCdn/index.js')
const path = require('path')
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 代码分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProduction = process.env.NODE_ENV === 'production'
const { title, publicPath } = require('./src/settings')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  // publicPath: publicPath,
  assetsDir: 'static',
  outputDir: 'dist',
  productionSourceMap: !isProduction,
  parallel: require('os').cpus().length > 1,
  lintOnSave: false,
  transpileDependencies: [],
  pages: {
    index: {
      // 入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      // filename: '../viewer/index.ejs',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: title,
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      externalsData: externalsData
    }
  },
  devServer: {
    port:8086,
    https: false,
    hotOnly: false,
    proxy: {
      '/api':{
        target: 'http://127.0.0.1:3000/api/',
        changeOrigin:true,
        secure: false,
        pathRewrite:{
            '^/api':''
        }
    },
    }
  },
  configureWebpack: config => {
    config.externals = {
      ...config.externals,
      ...getExternalModules()
    }
    const defaultPlugins = [
    ]
    config.plugins = [...config.plugins, ...defaultPlugins]
    if (isProduction) {
      const plugins = []
      // 代码压缩
      plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        })
      )

      config.plugins = [...config.plugins, ...plugins]
    } else {
      // 为开发环境修改配置...
    }
    if (process.env.VUE_APP_DEBUG === 'no') {
      // XXX 之后换成 TerserPlugin
      const debugPlugins = [
        // 移除console.log
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true //  删除debugger语句
            },
            output: {
              // 去掉注释内容
              comments: true
            }
          },
          sourceMap: false,
          parallel: true
        })
      ]
      config.plugins = [...config.plugins, ...debugPlugins]
    }
  },
  chainWebpack: config => {
    /**
     * 打包分析
     */
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }

    // config.module.rule("js").exclude.add(/NIM_Web_SDK.*\.js/);
    /**
     * 别名
     */
    config.resolve.alias
      .set('@', resolve('src'))
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: false,
    // 开启 CSS source maps?
    // sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // 引入全局变量样式
        prependData: '@import "~@/styles/variables.scss";'
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  }
}
