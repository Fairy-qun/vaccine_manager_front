import axios from '@/axios.js'

// 获取信息列表
export const getVaccineInfo = data => {
  return axios.post('/vaccine/getInfo', data)
}
// 条件查询
export const getVaccineInfoBy = data => {
  return axios.post('/vaccine/getInfoBy', data)
}

// 添加信息
export const addVaccineInfo = data => {
  return axios.post('/vaccine/createInfo', data)
}

// 删除信息
export const deleteVaccineInfo = data => {
  return axios.post('/vaccine/deleteInfo', data)
}

// 更新数据
export const updateVaccineInfo = data => {
  return axios.post('/vaccine/updateInfo', data)
}

// 导出数据
export const exportVaccineInfo = () => {
  return axios.post('/vaccine/export')
}
