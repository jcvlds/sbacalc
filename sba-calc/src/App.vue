<template>
<div id="app">
  <v-app>
    <HeaderBar />

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <FooterBar />

  </v-app>
</div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
import FooterBar from './components/FooterBar'

export default {
  name: 'App',

  components: {
    HeaderBar,
    FooterBar
  },

  data: () => ({
    //
  })
}
</script>

<style>
/* #app {
  margin-top: 60px
} */
</style>
