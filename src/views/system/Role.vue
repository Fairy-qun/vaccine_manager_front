<template>
  <div>
    <el-table :data="list">
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
  </div>
</template>

<script setup>
import { getRoleInfo } from '@/api/role.js'
import { reactive, onMounted } from 'vue'

const list = reactive([])
// 获取角色信息
const getRoleData = () => {
  getRoleInfo().then(res => {
    if (res.code === 0) {
      list.length = 0
      list.push(...res.data)
    }
  })
}
onMounted(() => {
  getRoleData()
})
</script>

<style lang="scss" scoped></style>
