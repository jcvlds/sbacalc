module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost'
  },
  // css: {
  //   extract: {
  //     filename: "/css/app.css"
  //   }
  // }
  // outputDir: 'dist-hub',
  // publicPath: 'https://cdn2.hubspot.net/hub/3270549/hub_generated/template_assets/29281462747/1589293319540/Templates/Custom/Page/NewCalc/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: "./js/app.js"
      // filename: '[app].js'
      // chunkFilename: '[appchunk].js'
    }
  }
}
