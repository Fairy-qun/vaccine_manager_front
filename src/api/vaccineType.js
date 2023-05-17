import axios from '@/axios.js'

// 获取信息列表
export const getVaccineTypeInfo = data => {
  return axios.post('/vaccineType/getInfo', data)
}
// 条件查询
export const getVaccineTypeInfoBy = data => {
  return axios.post('/vaccineType/getInfoBy', data)
}

// 添加信息
export const addVaccineTypeInfo = data => {
  return axios.post('/vaccineType/createInfo', data)
}

// 删除信息
export const deleteVaccineTypeInfo = data => {
  return axios.post('/vaccineType/deleteInfo', data)
}
