const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const lib = process.env.TARGET_LIB === 'true'
const comps = require('./component.json')

const pages = lib ? {
  ...comps
} : {
  index: './examples/main.js'
}

const configure = lib ? {
  devtool: false,
  entry: {
    ...pages
  },
  output: {
    filename: '[name]/index.js',
    library: 'mobui',
    libraryTarget: 'umd'
  },
  resolve: {
    symlinks: false
  }
} : {}

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
  configureWebpack: configure,
  chainWebpack: chain
}
