import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa'
  },
  theme: {
    themes: {
      light: {
        primary: '#051D49',
        secondary: '#D22031',
        accent: '#00B6DD'
      }
    }
  }
})
