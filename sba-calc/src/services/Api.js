import axios from 'axios'
// import store from '@/store/index'

export default () => {
  return axios.create({
    // baseURL: 'http://3.93.160.146/'
    baseURL: 'https://ppp-api.hco-tech.com/'
    // headers: {
    //   Authorization: ''
    // }
  })
}
// baseURL: 'http://localhost:8081/',
// baseURL: 'https://jsonplaceholder.typicode.com/',
