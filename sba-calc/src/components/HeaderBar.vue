<template>
      <!-- @mouseenter="check()" -->
    <v-app-bar
      app
      color="white"
      height="70"
      style="padding: 0 100px"
    >
    <v-row>
    <!-- <div class="d-flex">
      <div class="align-center"> -->
      <v-col class="align-center">
        <v-img
          alt="H&CO | Global Advisors"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://www.hcoadvisors.com/hubfs/CR%20FIles/hco-logo.svg"
          transition="scale-transition"
          width="150"
        />
      <!-- </div> -->
      </v-col>

      <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
      <!-- <div class="align-self-center justify-self-center"> -->
      <v-col class="align-self-center justify-self-center">
        <v-btn text style="font-size:1.3rem" class="primary--text">
          PPP Loan Forgiveness Calculator
        </v-btn>
      <!-- </div> -->
      </v-col>
      <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
      <!-- <div class="align-self-center justify-self-end"> -->
      <v-col v-if="!isUserLoggedIn" class="align-self-center justify-self-end">
        <v-btn text class="primary--text" to="/">
          Register
        </v-btn>
      </v-col>
      <v-col class="align-self-center justify-self-end">
        <!-- <v-btn text class="primary--text" to="/">
          Register
        </v-btn> -->
        <v-btn v-if="isUserLoggedIn" text
          class="primary--text"
          to="/login"
          @click="signOut();">
          Sign out
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" text class="primary--text" to="/login">
          Login
        </v-btn>
      <!-- </div> -->
      </v-col>

    <!-- </div> -->
    </v-row>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      > -->
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
// import axios from 'axios'
// import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Header',
  data: () => ({
    // isUserLoggedIn: false,
    error: ''
  }),
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user', 'client', 'token', 'company'
    ])
  },
  methods: {
    check () {
      if (!this.isUserLoggedIn) {
        this.$router.push({
          name: 'Login'
        })
      }
    },
    async signOut () {
      try {
        // const sessionUser = sessionStorage.getItem('user')
        // console.log(sessionUser)
        // console.log(this.user, this.token, this.client)
        // console.log(sessionStorage.getItem('uid'), sessionStorage.getItem('acess-token'), sessionStorage.getItem('client'))
        // console.log(sessionStorage.getItem('uid'), sessionStorage.getItem('acess-token'), sessionStorage.getItem('client'))
        // axios
        //   .request({
        //     baseURL: 'http://3.93.160.146/',
        //     url: 'auth/sign_out',
        //     method: 'delete',
        //     data: sessionUser
        //   })
        //   .then((response) => {
        //     console.log('success test')
        //   })
        //   .catch((err) => {
        //     const error = err
        //     console.log(`${error}'error test'`)
        //   })

        // const response = await AuthenticationService.signOut({
        //   sessionUser
        // uid: this.user,
        // uid: sessionStorage.getItem('uid'),
        // 'access-token': this.token,
        // 'access-token': sessionStorage.getItem('access-token'),
        // client: this.client
        // client: sessionStorage.getItem('client')
        // })
        // console.log(response.data.data.success)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setClient', null)
      } catch (error) {
        // this.error = error.response.data.error
        this.error = error.response
        console.log(this.error)
      }
      this.$router.push({
        name: 'Login'
      })
      // if (response.data.data.success) {
      //   this.$store.dispatch('setUser', null)
      //   this.$router.push({
      //     name: 'Login'
      //   })
      // }
    }
  }
}
</script>
