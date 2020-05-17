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
        <a target="_blank" href="https://www.hcoadvisors.com/e2t/c/*W4mksf88j-G3SW1ZZ6W921KVwf0/*W1C_4BD42WNkJW7-bM302tNhdg0/5/f18dQhb0Sjvg8XJ9RdN8BDSZTHbqG6W1yfnKS1PT-3BW7sR9j51vkZ1yW1L5k957r5ct_W2PgXz47xR9NRW2NB2NV1L2pdnW7x1PCR7KXGVwW7v4ryx2Sx7L5W1Klx4k1Fn1xGW6yyrrQ58zYp9W1GmwJ37vPVHQW7w4nLl2ZSLjDW64QZb68rvGVnVnK2zp7MXmzFN3bqvN6RFkK4W5G18Kh3y9KYQW3dgtM72-wy9KVDNkrQ3JrVtRW16nLpJ8zn4LpVTbdpH3N51DyW5DFYjr5vbh2VW3mG8KL3KpmXFW5XT0lj8FhF8kW3TjwyT8pB-pDW5sSSsN2ZD8L7W8rCsGH3hMnqwW8nxbNK5jYkdSW8jLqvW8ytQMYW5M-kqb8HggnSVDqp3z3kljNCN3Vksd5sz5QsW64TYqt4Pw1VkN2sbPxnqT_DsW3SWFN83sqfpWW6nkYwS4WHDbRW30Hpx6136BRPW9hy-5f7hG9_2V56lMg16FxdjW7FLVTk89sypyW1HphJz7D7HVgW1Dy_KC21VGZff2H2jd804">
        <v-img
          alt="H&CO | Global Advisors"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://www.hcoadvisors.com/hubfs/CR%20FIles/hco-logo.svg"
          transition="scale-transition"
          width="150"
        />
        </a>
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
import axios from 'axios'
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
        axios
          .request({
            baseURL: 'https://ppp-api.hco-tech.com/',
            url: 'auth/sign_out',
            method: 'delete',
            data: {
              uid: this.user,
              client: this.client,
              'access-token': this.token
            }
          })
          .then((response) => {
            console.log('success test')
          })
          .catch((err) => {
            const error = err
            console.log(`${error}'error test'`)
          })

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
