import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://ecommerceapi.jelangrkharisma.site/',
  timeout: (10 * 1000) // accept integers in milisecond = 1min
})

export default axiosInstance
