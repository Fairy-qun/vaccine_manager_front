<template>
  <div>
    <el-table :data="list" stripe border>
      <el-table-column label="用户ID" prop="id"></el-table-column>
      <el-table-column label="用户名称" prop="user_name"></el-table-column>
      <el-table-column label="手机号" prop="user_mobile"></el-table-column>
      <el-table-column label="身份证" prop="user_numberId"></el-table-column>
      <el-table-column label="注册时间" prop="createdAt"></el-table-column>
      <el-table-column label="用户角色" prop="user_role">
        <template #default="scoped">
          <el-tag type="success" v-if="scoped.row.user_role === 0">管理员</el-tag>
          <el-tag type="success" v-if="scoped.row.user_role === 1">普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scoped">
          <el-button type="success" size="small" @click="updateHandler(scoped.row)">
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-popconfirm title="是否删除该数据?" @cancel="cancelDeleteHandler" @confirm="confirmDeleteOne(scoped.row)" cancel-button-text="取消" confirm-button-text="确定">
            <template #reference>
              <el-button type="danger" size="small">
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 更新弹框 -->
    <el-dialog v-model="dialogTableVisible" title="更改用户角色">
      <el-table :data="lists" @cell-click="cellClick">
        <el-table-column label="角色ID" prop="id" width="100"></el-table-column>
        <el-table-column label="角色名称" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="role_state">
          <template #default="scoped">
            <el-tag type="success" v-if="scoped.row.role_state">可用</el-tag>
            <el-tag type="success" v-else>可用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色描述" prop="role_description"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { getUserInfoAll, setUserRole } from '@/api/user.js'
import { getRoleInfo } from '@/api/role.js'
import { reactive, onMounted, ref } from 'vue'
import { notice } from '@/utils.js'
import { removeStorage, getStorage } from '@/storage.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const list = ref([])
onMounted(() => {
  getUserInfo()
})
// 获取用户信息
const getUserInfo = () => {
  getUserInfoAll().then(res => {
    if (res.code === 0) {
      list.value = []
      list.value = res.data
    }
  })
}

// 删除用户
const cancelDeleteHandler = () => {
  notice({ type: 'info', message: '取消删除' })
}
const confirmDeleteOne = () => {}

const dialogTableVisible = ref(false)
const updateRole = reactive({
  id: '',
  user_role: ''
})
const currentUser = ref()
const updateHandler = row => {
  updateRole.id = row.id
  currentUser.value = row.user_name
  dialogTableVisible.value = true
  getRoleData()
}
// 获取角色信息
const lists = reactive([])
const getRoleData = () => {
  getRoleInfo().then(res => {
    if (res.code === 0) {
      lists.length = 0
      lists.push(...res.data)
    }
  })
}

// 当前用户
const user_info = JSON.parse(getStorage('user_info'))
// 共享角色
const user_role = ref('')
const cellClick = row => {
  console.log(row)
  if (row.role_name === '管理员') {
    updateRole.user_role = '0'
  }
  if (row.role_name === '普通用户') {
    updateRole.user_role = '1'
  }
  // console.log(updateRole)
  if (currentUser.value === 'admin') {
    notice({ message: '该用户不允许改其角色' })
    return
  }
  setUserRole(updateRole).then(res => {
    if (res.code === 0) {
      dialogTableVisible.value = false
      console.log(user_info)
      if (user_info.user_name === currentUser.value) {
        notice({ message: '你已更改当前用户角色，请重新登录' })
        removeStorage('token')
        removeStorage('user_info')
        removeStorage('tablist')
        router.replace('/login')
      } else {
        notice({ message: res.msg })
        getUserInfo()
      }
    }
  })
}
</script>

<style lang="scss" scoped></style>
