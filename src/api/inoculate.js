import axios from '@/axios.js'

// 获取信息列表
export const getInoculateInfo = data => {
  return axios.post('/inoculate/getInfo', data)
}
// 条件查询
export const getInoculateInfoBy = data => {
  return axios.post('/inoculate/getInfoBy', data)
}

// 添加信息
export const addInoculateInfo = data => {
  return axios.post('/inoculate/createInfo', data)
}

// 删除信息
export const deleteInoculateInfo = data => {
  return axios.post('/inoculate/deleteInfo', data)
}

// 更新数据
export const updateInoculateInfo = data => {
  return axios.post('/inoculate/updateInfo', data)
}
