import axios from '@/axios.js'
// 注册
export const register = data => {
  return axios.post('/users/register', data)
}

// 登录
export const login = data => {
  return axios.post('/users/login', data)
}
