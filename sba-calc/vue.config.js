module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost'
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  }
}
