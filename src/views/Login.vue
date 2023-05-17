<template>
  <div class="container">
    <!-- 表单数据 -->
    <div class="form-item">
      <h1>欢迎登录</h1>
      <el-form :model="user" :rules="rulesForm">
        <el-form-item prop="user_name">
          <el-input v-model="user.user_name" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
          <el-input v-model="user.user_password" :prefix-icon="Lock" placeholder="请输入用户密码" :show-password="true"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 100%" @click="onSubmit">登录</el-button>
      <div class="register" @click="goRegister">没有用户?点击注册</div>
    </div>
  </div>
</template>

<script setup>
import { login, getUserInfo } from '@/api/user.js'
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

// 表单验证
const rulesForm = reactive({
  user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  user_password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }]
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
    const res1 = await getUserInfo(user)
    if (res1.code === 0) {
      setStorage('user_info', JSON.stringify(res1.data))
    }
    setStorage('token', res.data.token)
    notice({ message: res.msg })
    router.push('/index')
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
  // height: 100%;
  height: calc(100vh);
  background: url('@/assets/login_bgc.jpg') no-repeat;
  background-size: cover;
  .form-item {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-10%, -50%);
    padding: 20px;
    width: 400px;
    height: 300px;
    background-color: #fff;
    box-shadow: 2px 2px 2px 2px;
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
