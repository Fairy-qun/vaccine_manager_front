<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="store.asideWidth + 'px'">
          <Aside />
        </el-aside>
        <TabBar class="tabBar" />
        <el-main>
          <div class="main-box">
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
.el-main {
}
.main-box {
  // transition: all 0.2s;
  // position: absolute;
  // top: 100px;
  // right: 0;
  // margin-left: 10px;
  margin-top: 40px;
}
.el-aside {
  margin-right: 20px;
  transition: all 0.2s;
  // background-color: rgb(55, 55, 137);
  box-shadow: 2px 0px 10px 1px #ccc;
  height: calc(100vh - 60px);
}
</style>
