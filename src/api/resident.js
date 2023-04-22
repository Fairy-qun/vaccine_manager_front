import axios from '@/axios.js'

// 获取居民信息列表
export const getResidentInfo = data => {
  return axios.post('/resident/getInfo', data)
}
