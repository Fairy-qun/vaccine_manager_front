import { defineStore } from 'pinia'
export const useStore = defineStore('store', {
  state: () => {
    return {
      asideWidth: 200,
      // 是否折叠菜单
      isCollapse: false
    }
  },
  actions: {
    changeAsideWidth(value) {
      this.asideWidth = value
    },
    changeCollapse(value) {
      this.isCollapse = value
    }
  }
})
