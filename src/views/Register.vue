<template>
  <div class="container">
    <!-- 表单数据 -->
    <div class="form-item">
      <h1>注册用户</h1>
      <el-form :model="user" :rules="ruleForm">
        <el-form-item prop="user_name">
          <el-input v-model="user.user_name" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
          <el-input v-model="user.user_password" :prefix-icon="Lock" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item prop="user_mobile">
          <el-input v-model="user.user_mobile" :prefix-icon="Iphone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="user_numberId">
          <el-input v-model="user.user_numberId" :prefix-icon="CreditCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item prop="user_role">
          <el-radio-group v-model="user.user_role" class="ml-4">
            <el-radio label="0" size="large">管理员</el-radio>
            <el-radio label="1" size="large">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 100%" @click="onSubmit">注册</el-button>
      <div class="register" @click="goLogin">已有用户?点击登录</div>
    </div>
  </div>
</template>

<script setup>
import { register } from '@/api/user.js'
import { User, Lock, Iphone, CreditCard } from '@element-plus/icons-vue'
import { notice } from '@/utils.js'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 用户表单
const user = reactive({
  user_name: '',
  user_password: '',
  user_mobile: '',
  user_numberId: '',
  user_role: ''
})
// 验证表单
const ruleForm = reactive({
  user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  user_password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
  user_mobile: [{ required: true, message: '请输入用户手机号', trigger: 'blur' }],
  user_numberId: [{ required: true, message: '请输入用户身份证号', trigger: 'blur' }],
  user_role: [{ required: true, message: '请选择用户角色', trigger: 'blur' }]
})

// 注册回调
const onSubmit = () => {
  register(user).then(res => {
    if (res.msg !== '注册用户成功') {
      notice({ type: 'error', message: res.msg })
    } else {
      notice({ message: `${res.msg}.请登录` })
      router.replace('/login')
    }
  })
}
// 跳转到登录页
const goLogin = () => {
  router.push('/login')
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
    height: 500px;
    background-color: #fff;
    box-shadow: 2px 2px 2px 2px;
    border-radius: 10px;
    h1 {
      margin-bottom: 20px;
    }
    .register {
      position: absolute;
      bottom: 100px;
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
