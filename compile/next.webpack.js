// eslint-disable-next-line import/no-extraneous-dependencies
const { ConcatSource } = require('webpack-sources')

class BannerPlugin {
  /**
   * @param {BannerPluginArgument} options options banner
   */
  constructor(options) {
    this.banner = options.banner
  }

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler) {
    compiler.hooks.compilation.tap('BannerPlugin', (compilation) => {
      compilation.hooks.afterOptimizeAssets.tap('BannerPlugin', (assets) => {
        Object.entries(assets).forEach(([pathname, source]) => {
          compilation.updateAsset(
            pathname,
            new ConcatSource(this.banner + source.source())
          )
        })
      })
    })
  }
}

module.exports = BannerPlugin
