const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const lib = process.env.TARGET_LIB === 'true'
const comps = require('./component.json')

const configure = lib ? {
  devtool: false,
  entry: {
    ...comps
  },
  output: {
    filename: '[name]/index.js',
    library: 'mobui',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  resolve: {
    symlinks: false
  }
} : {
  entry: './examples/main.js'
}

const chain = lib ? config => {
  config.entryPoints.delete('app')
  config.optimization.delete('splitChunks')
  config.optimization.minimize(false)
  config.plugins.delete('copy')
  config.plugins.delete('html')
  config.plugins.delete('preload')
  config.plugins.delete('prefetch')
  config.resolve.alias
    .set('@', resolve('./examples'))
    .set('pack', resolve('./packages'))
  config.module
    .rule('js')
    .include
    .add(resolve('packages'))
    .end()
    .use('babel')
    .loader('babel-loader')
    .tap(options => {
      return options
    })
} : config => {
  config.resolve.alias
    .set('@', resolve('./examples'))
  config.module
    .rule('js')
    .include
    .add(resolve('packages'))
    .end()
    .use('babel')
    .loader('babel-loader')
    .tap(options => {
      return options
    })
}

module.exports = {
  outputDir: lib ? 'lib' : 'dist',
  css: {
    extract: lib ? {
      filename: '[name]/style.css'
    } : true
  },
  devServer: {
    port: '7070'
  },
  configureWebpack: configure,
  chainWebpack: chain
}
