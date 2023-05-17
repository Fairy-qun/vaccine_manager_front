import axios from '@/axios.js'

// 获取信息列表
export const getInoculatePointInfo = data => {
  return axios.post('/inoculatePoint/getInfo', data)
}
// // 条件查询
export const getInoculatePointInfoBy = data => {
  return axios.post('/inoculatePoint/getInfoBy', data)
}

// 添加信息
export const addInoculatePointInfo = data => {
  return axios.post('/inoculatePoint/createInfo', data)
}

// 删除信息
export const deleteInoculatePointInfo = data => {
  return axios.post('/inoculatePoint/deleteInfo', data)
}

// 更新数据
export const updateInoculatePointInfo = data => {
  return axios.post('/inoculatePoint/updateInfo', data)
}
