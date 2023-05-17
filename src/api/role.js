import axios from '@/axios.js'

// 获取角色信息
export const getRoleInfo = data => {
  return axios.post('/role/getInfo')
}
