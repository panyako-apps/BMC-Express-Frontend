import axios from 'axios'

const Api = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname  + ':8800/api',
    withCredentials: true
})

export default Api

