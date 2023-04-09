<template>
  <div class="container">
    <!-- 表单数据 -->
    <div class="form-item">
      <h1>欢迎登录</h1>
      <el-form :model="user">
        <el-form-item>
          <el-input v-model="user.user_name" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.user_password" :prefix-icon="Lock" placeholder="请输入用户密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 100%" @click="onSubmit">登录</el-button>
      <div class="register" @click="goRegister">没有用户?点击注册</div>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/api/user.js'
import { setStorage } from '@/storage.js'
import { User, Lock } from '@element-plus/icons-vue'
import { notice } from '@/utils.js'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// 用户表单
const user = reactive({
  user_name: '',
  user_password: ''
})
// 跳转到登录页
const router = useRouter()
const goRegister = () => {
  router.push('/register')
}
// 登录回调
const onSubmit = async () => {
  const res = await login(user)
  // console.log(res)
  if (res.code === 0) {
    setStorage('token', res.data.token)
    notice({ message: res.msg })
    router.push('/home')
  } else {
    notice({ type: 'error', message: res.msg })
  }
}
// 监听键盘事件
window.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    onSubmit()
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/city-1.jpg');
  .form-item {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-10%, -50%);
    padding: 20px;
    width: 400px;
    height: 300px;
    background-color: skyblue;
    border-radius: 10px;
    h1 {
      margin-bottom: 20px;
    }
    .register {
      position: absolute;
      bottom: 60px;
      right: 20px;
      font-size: 14px;
      color: #862828;
    }
    .register:hover {
      cursor: pointer;
    }
  }
}
</style>
