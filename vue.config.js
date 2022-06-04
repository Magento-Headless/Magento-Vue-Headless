const path = require('path')
const webpack = require('webpack')
const dateFormat = require('dateformat')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const WebpackBarPlugin = require('webpackbar')

const BannerPlugin = require('./compile/next.webpack')
const SystemConfig = require('./config/system.conf')
// using data from package.json
const pkg = require('./package.json')

const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
const buildPath = 'build'

module.exports = {
  publicPath: '/',
  outputDir: buildPath,
  filenameHashing: true,
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      less: {
        lessOptions: {
          math: 'always',
          modifyVars: SystemConfig.antd.variables,
          javascriptEnabled: true
        }
      }
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: process.env.VUE_APP_BUNDLE_ANALYZER === 'true'
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 3000,
    https: false,
    hotOnly: true,
    overlay: {
      warning: true,
      errors: true
    },
    watchOptions: {
      ignored: ['node_modules'],
      aggregateTimeout: 300,
      poll: 1500
    },
    proxy: {
      '/graphql': {
        target: `${process.env.VUE_APP_GRAPHQL_URL}/graphql`,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/graphql': 'graphql'
        }
      },
      '/api': {
        target: process.env.VUE_APP_GRAPHQL_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    }
  },
  // pwa: {
  //   name: 'My App',
  //   themeColor: '#4DBA87',
  //   msTileColor: '#000000',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'black',
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: 'dev/sw.js'
  //   }
  // },
  chainWebpack: (config) => {
    // Remove the old entry and add the new one
    config.entry('app').clear().add('./bootstrap/main').end()

    config.resolve.alias
      .set('~', path.resolve(__dirname, './'))
      .set('@', path.resolve(__dirname, './'))
      .set(
        '@ant-design/icons/lib/dist$',
        path.resolve(__dirname, './components/Icons/icons.js')
      )
  },
  configureWebpack: (config) => {
    // Webpack progress
    config.plugins.push(new WebpackBarPlugin())

    if (IS_PROD) {
      config.plugins.push(
        new LodashModuleReplacementPlugin({
          shorthands: true,
          cloning: true,
          collections: true,
          paths: true
        })
      )

      config.optimization.minimizer.push(
        new BannerPlugin({
          banner: `/*!\n *  @name: ${pkg.name} \n *  @author: ${
            pkg.author
          } \n *  @date: ${dateFormat(
            new Date(),
            'UTC:dddd, mmmm dS, yyyy, h:MM:ss TT'
          )} \n *  @version: ${pkg.version} \n *  @license: ${
            pkg.license
          } \n *  @copyright: ${pkg.copyright} \n */\n`
        })
      )
    }

    /* strips out moment locales */
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  }
}
