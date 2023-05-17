<template>
  <div class="main">
    <!-- 左侧数据 -->
    <div class="left_icon">
      <div class="title">社区疫苗接种管理系统</div>
      <div class="icon" @click="changeAsideWidth">
        <el-tooltip :content="store.asideWidth === 200 ? '收纳' : '展开'" placement="bottom">
          <el-icon :size="25" color="#ffffff" v-if="store.asideWidth === 200"><Fold /></el-icon>
          <el-icon :size="25" color="#fff" v-else><Expand /></el-icon>
        </el-tooltip>
      </div>
    </div>

    <!-- 右侧数据 -->
    <div class="right_list">
      <div class="icon">
        <el-tooltip content="刷新" placement="bottom">
          <el-icon :size="25" color="#fff" @click="refreshHandler" style="margin-right: 30px"><Refresh /></el-icon>
        </el-tooltip>
        <!-- 全屏 -->
        <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
          <el-icon :size="25" color="#fff" style="margin-right: 20px" @click="toggle">
            <FullScreen v-if="!isFullscreen" />
            <Aim v-else />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="name">
        欢迎您:<span>{{ user.user_name }}</span>
      </div>
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-icon class="el-icon--right" color="#fff"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="reset">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 修改密码弹框 -->
    <el-dialog v-model="dialogResetVisible" title="修改密码" width="30%">
      <el-form :model="resetForm">
        <el-form-item label="新密码">
          <el-input v-model="resetForm.pwd" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmReset"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useStore } from '@/store/index.js'
import { getStorage, removeStorage } from '@/storage.js'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import { resetPwd } from '@/api/user.js'
import { notice } from '@/utils.js'
import { ref, reactive } from 'vue'

const { isFullscreen, toggle } = useFullscreen()

const router = useRouter()
const store = useStore()

const user = JSON.parse(getStorage('user_info'))

// 改变菜单栏的宽度
const changeAsideWidth = () => {
  if (store.asideWidth === 200) {
    store.changeAsideWidth(64)
    store.changeCollapse(true)
  } else {
    store.changeAsideWidth(200)
    store.changeCollapse(false)
  }
}
const resetForm = reactive({
  pwd: ''
})
const handleCommand = e => {
  switch (e) {
    case 'reset':
      dialogResetVisible.value = true
      break
    case 'logout':
      removeStorage('user_info')
      removeStorage('token')
      removeStorage('tablist')
      router.push('/login')
      location.reload()
      break
  }
}
const confirmReset = () => {
  resetPwd({ id: user.id, user_password: resetForm.pwd }).then(res => {
    if (res.code === 0) {
      notice({ message: `修改${user.user_name}用户密码成功` })
      removeStorage('token')
      removeStorage('user_info')
      removeStorage('tablist')
      dialogResetVisible.value = false
      router.push('/login')
      location.reload()
    } else {
      notice({ message: `修改${user.user_name}用户密码失败` })
    }
  })
}
const dialogResetVisible = ref(false)

// 刷新页面
const refreshHandler = () => {
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  .left_icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 20px;
    font: inherit;
    .title {
      margin-right: 20px;
    }
  }
  .right_list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .name {
      margin-left: 40px;
      color: #fff;
      span {
        font-weight: 700;
      }
    }
  }
}
</style>
