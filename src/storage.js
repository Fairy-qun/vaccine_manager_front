// 设置存储
export const setStorage = (name, data) => {
  return sessionStorage.setItem(name, data)
}

// 获取存储
export const getStorage = name => {
  return sessionStorage.getItem(name)
}

// 移除存储
export const removeStorage = name => {
  return sessionStorage.removeItem(name)
}
