import axios from '@/axios.js'

// 获取居民信息列表
export const getResidentInfo = data => {
  return axios.post('/resident/getInfo', data)
}
// 条件查询
export const getResidentInfoBy = data => {
  return axios.post('/resident/getInfoBy', data)
}

// 添加信息
export const addResidentInfo = data => {
  return axios.post('/resident/createInfo', data)
}

// 删除信息
export const deleteResidentInfo = data => {
  return axios.post('/resident/deleteInfo', data)
}

// 更新数据
export const updateResidentInfo = data => {
  return axios.post(`/resident/updateInfo`, data)
}

// 导出数据
export const exportVaccineInfo = () => {
  return axios.post('/resident/export')
}
