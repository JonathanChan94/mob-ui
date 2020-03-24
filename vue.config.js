const path = require('path')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  pages: {
    index: {
      entry: './examples/main.js',
      template: './public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: config => ({
    devtool: false,
    resolve: {
      symlinks: false
    }
  }),
  chainWebpack: config => {
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
}
