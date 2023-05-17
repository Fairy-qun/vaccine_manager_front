<template>
  <div class="main">
    <div class="find_item">
      <div class="left">
        <el-row>
          <el-col :span="8">
            <el-input v-model="queryFrom.id" placeholder="请输入ID查询" clearable></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="queryFrom.inoculate_name" placeholder="请输入名称查询" clearable></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <el-row>
          <el-col :span="6">
            <el-button type="primary" @click="queryHandler">查询</el-button>
          </el-col>
          <el-col :span="6">
            <el-popconfirm title="确定删除所选信息?" cancel-button-text="取消" confirm-button-text="确定" @cancel="cancelDeleteHandler" @confirm="confirmDeleteHandler">
              <template #reference>
                <el-button type="danger">批量删除</el-button>
              </template>
            </el-popconfirm>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <el-table :data="inoculate_list" border stripe @select="selectTableHandler">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="vaccine_batch" label="接种疫苗批次" width="150"></el-table-column>
        <el-table-column prop="inoculate_name" label="接种疫苗名称" width="150"></el-table-column>
        <el-table-column prop="resident_name" label="居民姓名" width="150"></el-table-column>
        <el-table-column prop="inoculate_date" label="接种日期" width="150"></el-table-column>
        <el-table-column prop="inoculatePoint_name" label="接种点名称" width="150"></el-table-column>
        <el-table-column prop="inoculatePoint_address" label="接种地址" width="150"></el-table-column>
        <el-table-column label="操作">
          <template #default="scoped">
            <el-button type="primary" size="small" @click="updateHandler(scoped.row)">
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
    </div>
    <!-- 分页操作 -->
    <div class="pagination">
      <el-pagination v-model:current-page="form.pageNo" v-model:page-size="form.pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <!-- 更新抽屉 -->
    <Drawer :drawer="updateDrawer" :title="updateTitle" @cancelHandler="cancelUpdateHandler" @comfirmHandler="confirmUpdateHandler">
      <el-form :model="addForm" ref="drawerRef">
        <el-form-item label="居民">
          <el-input v-model="addForm.resident_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="批次" prop="inoculate_name">
          <el-button type="primary" size="small" style="margin-bottom: 5px" @click="selectInfoHandler">选择信息</el-button>
          <el-input v-model="addForm.vaccine_batch" placeholder="请输入接种疫苗批次" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="inoculate_name">
          <el-input v-model="addForm.inoculate_name" placeholder="请输入接种疫苗名称" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="接种日期" prop="inoculate_date">
          <el-date-picker v-model="addForm.inoculate_date" type="datetime" placeholder="选择接种日期" @change="changeTimeHandler" />
        </el-form-item>
      </el-form>
    </Drawer>

    <!-- 疫苗表单对话框 -->
    <el-dialog v-model="dialogVaccine" title="信息选择">
      <el-table :data="gridData" stripe border @cell-click="cellClick">
        <el-table-column property="vaccine_batch" label="疫苗批次" />
        <el-table-column property="vaccine_name" label="疫苗名称" />
        <el-table-column property="vaccine_categroy" label="疫苗分类" />
        <el-table-column property="vaccine_manufacturer" label="生产企业" />
        <el-table-column property="vaccine_productDate" label="生产时间" />
        <el-table-column property="vaccine_overdueDate" label="有效期" />
        <el-table-column property="vaccine_standard" label="注射规范" />
        <el-table-column property="vaccine_explain" label="注射说明" />
      </el-table>
      <!-- 分页操作 -->
      <div class="pagination" style="margin-top: 10px">
        <el-pagination v-model:current-page="formPage.pageNo" v-model:page-size="formPage.pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total_vaccine" @size-change="handleSizeVaccineChange" @current-change="handleCurrentVaccineChange" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getInoculateInfo, getInoculateInfoBy, addInoculateInfo, deleteInoculateInfo, updateInoculateInfo } from '@/api/inoculate.js'
import { getVaccineInfo } from '@/api/vaccine.js'
import Drawer from '@/components/drawer.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import { notice } from '@/utils.js'
const inoculate_list = ref([])

const form = reactive({
  pageNo: 1,
  pageSize: 5
})
const total = ref(0)

// 获取数据
const getDataList = () => {
  getInoculateInfo(form).then(res => {
    if (res.code === 0) {
      total.value = res.total_count
      inoculate_list.value = []
      inoculate_list.value.push(...res.data)
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

onMounted(() => {
  getDataList()
})

// 查询回调
const queryFrom = reactive({
  id: '',
  inoculate_name: ''
})
const queryHandler = () => {
  getInoculateInfoBy(queryFrom).then(res => {
    // console.log(res)
    if (res.data.length === 0) {
      notice({ type: 'info', message: '未查询到数据' })
      queryFrom.id = ''
      queryFrom.inoculate_name = ''
      getDataList()
      return
    } else {
      inoculate_list.value = []
      inoculate_list.value = res.data
      queryFrom.id = ''
      queryFrom.inoculate_name = ''
    }
  })
}

// 抽屉
const drawer = ref(false)
const title = ref('')
const drawerRef = ref(null)
const cancelHandler = () => {
  drawer.value = false
  drawerRef.value.resetFields()
}
const comfirmHandler = () => {
  addInoculateInfo(addForm).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
      drawer.value = false
      drawerRef.value.resetFields()
    }
  })
}

// 添加数据
const vaccineCategroy_value = ref('')
const addForm = reactive({
  inoculate_name: '',
  inoculate_date: '',
  resident_name: '',
  vaccine_batch: ''
})
const inoculateInjection_value = ref('')
const inoculate_time = ref('')
const selectChangeHandler = val => {
  addForm.inoculate_injection = val
}
// 时间
const changeTimeHandler = value => {
  // console.log(value)
  let start_date = new Date(value)
  let start_Y = start_date.getFullYear()
  let start_M = start_date.getMonth() + 1
  let start_d = start_date.getDate()
  let start_h = start_date.getHours() < 10 ? '0' + start_date.getHours() : start_date.getHours()
  let start_m = start_date.getMinutes() < 10 ? '0' + start_date.getMinutes() : start_date.getMinutes()
  let start_s = start_date.getSeconds() < 10 ? '0' + start_date.getSeconds() : start_date.getSeconds()
  let startDay = `${start_Y.toString()}-${start_M.toString()}-${start_d.toString()} ${start_h.toString()}:${start_m.toString()}:${start_s.toString()}`
  addForm.inoculate_date = startDay
}

const deleteArr = ref([])
// 选择数据
const selectTableHandler = (selection, row) => {
  console.log(selection)
  deleteArr.value = []
  selection.forEach(item => {
    deleteArr.value.push(item.id)
  })
  deleteArr.value = [...new Set(Array.from(deleteArr.value))]
  console.log(Array.from(deleteArr.value))
}

// 取消删除
const cancelDeleteHandler = () => {
  notice({ type: 'info', message: '取消删除' })
}
const confirmDeleteHandler = () => {
  if (Array.from(deleteArr.value).length === 0) {
    notice({ type: 'info', message: '请选择删除项' })
  } else {
    DeleteHandler()
  }
}
// 删除数据
const DeleteHandler = () => {
  deleteInoculateInfo({ id: Array.from(deleteArr.value) }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
    }
  })
}
const confirmDeleteOne = row => {
  console.log(row)
  deleteInoculateInfo({ id: row.id }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
    }
  })
}

// 更新数据
const updateTitle = ref('更新数据')
const updateDrawer = ref(false)
const id = ref('')
const updateHandler = row => {
  // console.log(row)
  id.value = row.id
  addForm.inoculate_name = row.inoculate_name
  addForm.inoculate_date = row.inoculate_date
  addForm.resident_name = row.resident_name
  addForm.vaccine_batch = row.vaccine_batch

  updateDrawer.value = true
}
const cancelUpdateHandler = () => {
  updateDrawer.value = false
}
const confirmUpdateHandler = () => {
  updateInoculateInfo({ id: id.value, ...addForm }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      updateDrawer.value = false
      getDataList()
    }
  })
}

// 选择信息
const formPage = reactive({
  pageNo: 1,
  pageSize: 5
})
const total_vaccine = ref(0)
const dialogVaccine = ref(false)
const selectInfoHandler = () => {
  dialogVaccine.value = true
  getVaccineData()
}
// 获取疫苗信息
const gridData = ref([])
const getVaccineData = () => {
  getVaccineInfo(formPage).then(res => {
    if (res.code === 0) {
      gridData.value = []
      gridData.value.push(...res.data)
      total_vaccine.value = res.total_count
    }
  })
}
// 分页
const handleSizeVaccineChange = val => {
  formPage.pageSize = val
  getVaccineData()
}
const handleCurrentVaccineChange = val => {
  formPage.pageNo = val
  getVaccineData()
}
// 单元格被点击之后
const cellClick = row => {
  addForm.vaccine_batch = row.vaccine_batch
  addForm.inoculate_name = row.vaccine_name
  dialogVaccine.value = false
}
</script>

<style lang="scss" scoped>
.main {
  .find_item {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      margin-right: 40px;
    }
  }
}
.el-col {
  margin: 10px;
}
.pagination {
  margin-top: 10px;
}
</style>
