module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //默认@代表src
        //assets则表示src/assets
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

