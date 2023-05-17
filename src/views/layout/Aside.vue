<template>
  <div class="main">
    <el-menu :default-active="defaultActive" :unique-opened="true" router :collapse="store.isCollapse" :collapse-transition="false" @select="selectHandler">
      <template v-for="item in asideDataList" :key="item.id">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.path">
            <el-icon>
              <component :is="item1.icon"></component>
            </el-icon>
            <span>{{ item1.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useStore } from '@/store/index.js'
import { getStorage } from '@/storage.js'
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

// 菜单栏数据
const user_info = JSON.parse(getStorage('user_info'))
const asideDataList = user_info.menus
const store = useStore()
const router = useRouter()
const route = useRoute()

// 绑定激活的index
const defaultActive = ref(route.path)
// 监听路由
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path
})
// 切换菜单
const selectHandler = e => {
  router.push(e)
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
