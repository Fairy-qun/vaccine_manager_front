import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:5005/api'
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  function (config) {
    // 自动添加token
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return error.response.data
  }
)

export default service
