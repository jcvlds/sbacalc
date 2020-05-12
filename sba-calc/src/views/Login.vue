<template>
  <v-container>

      <v-row no-gutters class="text-center" justify="center">
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-card raised shaped outlined class="d-flex flex-column px-10 py-3" id="top" ref="top">

          <div class="error">{{ error }} </div>

          <v-toolbar dark class="rounded d-flex justify-center" dense color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-form ref="form" v-model="valid" id="form">
          <v-row justify="center"><v-col cols="12" md="8">
          <v-text-field
            class=""
            v-model="email"
            label="Email"
            outlined
            :rules="[v => !!v || 'Email is required', rules.email]"
            >
          </v-text-field>
          </v-col></v-row>

          <v-row justify="center"><v-col cols="12" md="8">
          <v-text-field
            class="my-n6"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[v => !!v || 'Password is required', rules.min]"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            name="input-10-1"
            label="Password"
            @keyup.enter="login();"
            outlined
            >
          </v-text-field>
          </v-col></v-row>

          <v-row justify="center"><v-col cols="12" md="8">
            <v-btn x-large width="100%"
              :disabled="!valid"
              color="success"
              class=""
              rounded
              @click="login(); snackbar = !snackbar;"
              > Login
            </v-btn>
          </v-col></v-row>
          <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                top right
                color="success"
                style="margin-top:40vh; margin-right:39vw;"
              >
                Successful Login
                <v-btn
                  color="white"
                  text
                  @click="snackbar = !snackbar"
                >
                  X
                </v-btn>
              </v-snackbar>

              <!-- v-fields and v-models -->
              <!-- div for errors -->
              <!-- button to signup method -->
              <!-- some validation -->
          </v-form>
          </v-card>
        </v-col>
      </v-row>
    <!-- </v-card> -->

  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    show1: false,
    snackbar: false,
    timeout: 2500,
    email: '',
    password: '',
    error: null,
    rules: {
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
      // min: v => v.length >= 8 || 'Min 8 characters'
    }
  }),
  methods: {
    async login () {
      try {
        // send all fields > back-end checks and stores > sends back email and token
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        // console.log(response.headers['access-token'])
        // console.log(response.headers.client)
        // get token and user-email back
        // this.firstName = response.data.userId
        // dispatch token and user to $store > router push to calc
        // this.$store.dispatch('setToken', response.data.token)
        // this.$store.dispatch('setUser', response.data.uid)
        console.log(response.data.data.uid)
        const user = {
          uid: response.headers.uid,
          client: response.headers.client,
          'access-token': response.headers['access-token']
        }
        const sessionUser = JSON.stringify(user)
        this.$store.dispatch('setUser', response.data.data.uid)
        // sessionStorage.setItem('uid', response.data.data.uid)
        sessionStorage.setItem('user', sessionUser)
        this.$store.dispatch('setToken', response.headers['access-token'])
        // sessionStorage.setItem('access-token', response.headers['access-token'])
        this.$store.dispatch('setClient', response.headers.client)
        // sessionStorage.setItem('client', response.headers.client)
        this.$store.dispatch('setCompany', response.data.data.company_name)
        this.$store.dispatch('setLoanAmt', response.data.data.ppp_loan_amount)

        this.$router.push({
          name: 'Calc'
        })
      } catch (error) {
        // catch server errors
        this.error = error.response.data.error
      }
    },
    toLocale (amt) {
      var formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0
      })

      const curr = formatter.format(amt)
      return curr
    },
    isAlphanumeric (str) {
      return /^[\s._\-a-zA-Z]+$/.test(str)
    },
    formatLoan (amt) {
      var input = amt
      var check = this.isAlphanumeric(input)
      if (check) {
        this.pppLoanAmt = ''
      } else {
        var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
        this.pppLoanAmt = this.toLocale(input)
      }

      // var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
      // input = input ? parseInt(input, 10) : 0
      // if (input !== '') {
      //   this.pppLoanAmt = this.toLocale(input)
      // }
    }
  }
}
</script>

<style scoped>
.rounded {
  border-radius: 10px !important
}
</style>
