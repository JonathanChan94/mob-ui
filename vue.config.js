const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const lib = process.env.TARGET_LIB === 'true'
const comps = require('./component.json')
const compNames = Object.keys(comps)

const pages = lib ? {
  ...comps
} : {
  index: './examples/main.js'
}

const configure = lib ? {
  devtool: false,
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
  config.plugins.delete('copy')
  compNames.map(name => {
    config.plugins.delete(`html-${name}`)
    config.plugins.delete(`preload-${name}`)
    config.plugins.delete(`prefetch-${name}`)
  })
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
  pages: {
    ...pages
  },
  outputDir: lib ? 'lib' : 'dist',
  css: {
    extract: lib ? {
      filename: '[name]/style.css'
    } : true
  },
  configureWebpack: configure,
  chainWebpack: chain
}
