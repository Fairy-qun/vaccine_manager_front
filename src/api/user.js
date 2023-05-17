import axios from '@/axios.js'
// 注册
export const register = data => {
  return axios.post('/users/register', data)
}

// 登录
export const login = data => {
  return axios.post('/users/login', data)
}

// 获取用户信息
export const getUserInfo = data => {
  return axios.post('/users/getUserInfo', {
    user_name: data.user_name
  })
}

// 获取用户信息所有
export const getUserInfoAll = data => {
  return axios.post('/users/getInfoAll')
}

// 设置用户角色
export const setUserRole = data => {
  return axios.post('/users/setRole', data)
}
// 重置用户密码
export const resetPwd = data => {
  return axios.post('/users/reset', data)
}
