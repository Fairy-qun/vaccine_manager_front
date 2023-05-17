<template>
  <div>
    <el-table :data="list_table" border stripe>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="vaccine_batch" label="接种疫苗批次"></el-table-column>
      <el-table-column prop="inoculate_name" label="接种疫苗名称"></el-table-column>
      <el-table-column prop="resident_name" label="居民姓名"></el-table-column>
      <el-table-column prop="inoculate_date" label="接种日期"></el-table-column>
      <el-table-column prop="inoculatePoint_name" label="接种点名称"></el-table-column>
      <el-table-column prop="inoculatePoint_address" label="接种地址"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getStorage } from '@/storage.js'
import { getResidentInfoBy } from '@/api/resident.js'
import { getInoculateInfoBy } from '@/api/inoculate.js'
const user_info = JSON.parse(getStorage('user_info'))

const username = ref('')
const list_table = reactive([])
// 查询回调
const queryFrom = reactive({
  resident_numberId: ''
})
// 获取居民信息
const getResident = () => {
  console.log(user_info.user_numberId)
  queryFrom.resident_numberId = user_info.user_numberId
  console.log(queryFrom)
  getResidentInfoBy(queryFrom)
    .then(res => {
      if (res.code === 0) {
        username.value = res.data[0].resident_name
      }
    })
    .then(res => {
      console.log(username.value)
      getInoculateInfoBy({ resident_name: username.value }).then(res => {
        if (res.code === 0) {
          list_table.push(...res.data)
        }
      })
    })
}
onMounted(() => {
  getResident()
})
</script>

<style lang="scss" scoped></style>
