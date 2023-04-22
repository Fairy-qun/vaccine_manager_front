<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <TabBar />
          <div class="main-box" :style="{ left: store.asideWidth + 'px' }">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useStore } from '@/store/index.js'
import Header from './Header.vue'
import Aside from './Aside.vue'
import TabBar from './TabBar.vue'
const store = useStore()
</script>

<style lang="scss" scoped>
.el-header {
  background: linear-gradient(to right, #4c6a8d, #2c4f60);
}
.main-box {
  transition: all 0.2s;
  position: absolute;
  top: 110px;
  right: 0;
  margin-left: 10px;
}
</style>
