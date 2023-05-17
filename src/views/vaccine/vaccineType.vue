<template>
  <div>
    <!-- 条件查询 -->
    <el-row>
      <el-col :span="4">
        <el-input v-model="queryFrom.id" placeholder="请输入ID查询" clearable></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="queryFrom.vaccineType_name" placeholder="请输入名称查询" clearable></el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="queryHandler">查询</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="addHandler">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" stripe border>
      <el-table-column label="类型ID" prop="id" width="100"></el-table-column>
      <el-table-column label="类型名称" prop="vaccineType_name"></el-table-column>
      <el-table-column label="操作">
        <template #default="scoped">
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

    <!-- 分页操作 -->
    <div class="pagination" style="margin-top: 20px">
      <el-pagination v-model:current-page="form.pageNo" v-model:page-size="form.pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <!-- 添加 -->
    <el-dialog v-model="dialogVisible" title="添加疫苗分类" width="30%" :show-close="false" :close-on-click-modal="false">
      <el-form :model="addForm">
        <el-form-item label="分类名称">
          <el-input v-model="addForm.vaccineType_name" placeholder="请输入疫苗分类名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddHandler"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getVaccineTypeInfo, getVaccineTypeInfoBy, addVaccineTypeInfo, deleteVaccineTypeInfo } from '@/api/vaccineType.js'
import { onMounted, ref, reactive } from 'vue'
import { notice } from '@/utils.js'

const list = ref([])
const form = reactive({
  pageNo: 1,
  pageSize: 10
})
const total = ref(0)
const getDataList = () => {
  getVaccineTypeInfo().then(res => {
    list.value = []
    list.value.push(...res.data)
    total.value = res.total_count
  })
}
onMounted(() => {
  getDataList()
})

// 查询回调
const queryFrom = reactive({
  id: '',
  vaccineType_name: ''
})
const queryHandler = () => {
  getVaccineTypeInfoBy(queryFrom).then(res => {
    // console.log(res)
    if (res.data.length === 0) {
      notice({ type: 'info', message: '未查询到数据' })
      queryFrom.id = ''
      queryFrom.vaccineType_name = ''
      getDataList()
      return
    } else {
      list.value = []
      list.value = res.data
      queryFrom.id = ''
      queryFrom.vaccineType_name = ''
    }
  })
}

// 添加
const dialogVisible = ref(false)
const addHandler = () => {
  dialogVisible.value = true
}
const addForm = reactive({
  vaccineType_name: ''
})
const confirmAddHandler = () => {
  addVaccineTypeInfo(addForm).then(res => {
    if (res.code === 0) {
      list.length = 0
      notice({ message: res.msg })
      dialogVisible.value = false
      addForm.vaccineType_name = ''
      getDataList()
    }
  })
}

// 删除
// 取消删除
const cancelDeleteHandler = () => {
  notice({ type: 'info', message: '取消删除' })
}

const confirmDeleteOne = row => {
  deleteVaccineTypeInfo({ id: row.id }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
    }
  })
}

// 分页
const handleSizeChange = val => {
  form.pageSize = val
  getDataList()
}
const handleCurrentChange = val => {
  form.pageNo = val
  getDataList()
}
</script>

<style lang="scss" scoped>
.el-col {
  margin: 10px;
}
</style>
