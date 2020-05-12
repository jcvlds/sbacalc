import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    client: null,
    company: null,
    loanAmt: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      Vue.set(this.state, 'token', token)

      if (token) {
        Vue.set(this.state, 'isUserLoggedIn', true)
      } else {
        Vue.set(this.state, 'isUserLoggedIn', false)
      }
    },
    setClient (state, client) {
      Vue.set(this.state, 'client', client)
    },
    setCompany (state, company) {
      Vue.set(this.state, 'company', company)
    },
    setLoanAmt (state, loan) {
      Vue.set(this.state, 'loanAmt', loan)
    },
    setUser (state, user) {
      // state.user = user
      Vue.set(this.state, 'user', user)
      // if (user) {
      //   Vue.set(this.state, 'isUserLoggedIn', true)
      // } else {
      //   Vue.set(this.state, 'isUserLoggedIn', false)
      // }
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setClient ({ commit }, client) {
      commit('setClient', client)
    },
    setCompany ({ commit }, company) {
      commit('setCompany', company)
    },
    setLoanAmt ({ commit }, loan) {
      commit('setLoanAmt', loan)
    }
  },
  // getters: {
  //   getUser(state) => { this.state.user }
  // },
  modules: {
  }
})
