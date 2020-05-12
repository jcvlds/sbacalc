import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('auth', credentials)
  },
  login (credentials) {
    return Api().post('auth/sign_in', credentials)
  },
  signOut (credentials) {
    return Api().delete('auth/sign_out', credentials)
    // return Api().delete('auth/sign_out', {
    //   uid: credentials.uid,
    //   'acces-token': credentials['access-token'],
    //   client: credentials.client
    // })
  }
}
