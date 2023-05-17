<template>
  <div class="main">
    <div class="find_item">
      <div class="left">
        <el-row>
          <el-col :span="6">
            <el-input v-model="queryFrom.id" placeholder="请输入ID查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.vaccine_categroy" placeholder="请输入分类查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.vaccine_batch" placeholder="请输入批号查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.vaccine_name" placeholder="请输入名称查询" clearable></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <el-row>
          <el-col :span="6">
            <el-button type="primary" @click="queryHandler">查询</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <el-table :data="vaccine_list" border stripe @select="selectTableHandler">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="vaccine_name" label="名称"></el-table-column>
        <el-table-column prop="vaccine_batch" label="批次"></el-table-column>
        <el-table-column prop="vaccine_categroy" label="分类"></el-table-column>
        <!-- <el-table-column prop="vaccine_img" label="图片" width="100"></el-table-column> -->
        <el-table-column prop="vaccine_manufacturer" label="生产商"></el-table-column>
        <el-table-column prop="vaccine_productDate" label="生产日期"></el-table-column>
        <el-table-column prop="vaccine_overdueDate" label="有效期"></el-table-column>
        <el-table-column prop="vaccine_standard" label="注射规范"></el-table-column>
        <el-table-column prop="vaccine_explain" label="注射说明"></el-table-column>
      </el-table>
    </div>
    <!-- 分页操作 -->
    <div class="pagination">
      <el-pagination v-model:current-page="form.pageNo" v-model:page-size="form.pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 添加抽屉 -->
    <Drawer :drawer="drawer" :title="title" @cancelHandler="cancelHandler" @comfirmHandler="comfirmHandler">
      <el-form :model="addForm" ref="drawerRef">
        <el-form-item label="名称" label-width="120" prop="vaccine_name">
          <el-input v-model="addForm.vaccine_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120" prop="vaccine_categroy">
          <el-select v-model="vaccineCategroy_value" placeholder="请选择疫苗分类" @change="selectChangeCategroyHandler">
            <el-option v-for="item in vaccineCategroyOptions" :key="item.id" :label="item.vaccineType_name" :value="item.vaccineType_name" />
          </el-select>
        </el-form-item>
        <el-form-item label="批次" label-width="120" prop="vaccine_batch">
          <el-input v-model="addForm.vaccine_batch" placeholder="请输入批次"></el-input>
        </el-form-item>
        <el-form-item label="生产商" label-width="120" prop="vaccine_manufacturer">
          <el-input v-model="addForm.vaccine_manufacturer" placeholder="请输入生产商"></el-input>
        </el-form-item>
        <el-form-item label="日期" label-width="120">
          <el-date-picker v-model="timeValue" type="datetimerange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" @change="changeTimeHandler" format="YYYY/MM/DD HH:mm:ss" />
        </el-form-item>
        <el-form-item label="注射规范" label-width="120" prop="vaccine_standard">
          <el-input v-model="addForm.vaccine_standard" placeholder="请输入注射规范"></el-input>
        </el-form-item>
        <el-form-item label="注射说明" label-width="120" prop="vaccine_explain">
          <el-input v-model="addForm.vaccine_explain" placeholder="请输入注射说明"></el-input>
        </el-form-item>
      </el-form>
    </Drawer>

    <!-- 更新抽屉 -->
    <Drawer :drawer="updateDrawer" :title="updateTitle" @cancelHandler="cancelUpdateHandler" @comfirmHandler="confirmUpdateHandler">
      <el-form :model="addForm" ref="drawerRef">
        <el-form-item label="名称" label-width="120" prop="vaccine_name">
          <el-input v-model="addForm.vaccine_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120" prop="vaccine_categroy">
          <el-select v-model="vaccineCategroy_value" placeholder="请选择疫苗分类" @change="selectChangeCategroyHandler">
            <el-option v-for="item in vaccineCategroyOptions" :key="item.id" :label="item.vaccineType_name" :value="item.vaccineType_name" />
          </el-select>
        </el-form-item>
        <el-form-item label="批次" label-width="120" prop="vaccine_batch">
          <el-input v-model="addForm.vaccine_batch" placeholder="请输入批次"></el-input>
        </el-form-item>
        <el-form-item label="生产商" label-width="120" prop="vaccine_manufacturer">
          <el-input v-model="addForm.vaccine_manufacturer" placeholder="请输入生产商"></el-input>
        </el-form-item>
        <el-form-item label="日期" label-width="120">
          <el-date-picker v-model="timeValue" type="datetimerange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" @change="changeTimeHandler" format="YYYY/MM/DD HH:mm:ss" />
        </el-form-item>
        <el-form-item label="注射规范" label-width="120" prop="vaccine_standard">
          <el-input v-model="addForm.vaccine_standard" placeholder="请输入注射规范"></el-input>
        </el-form-item>
        <el-form-item label="注射说明" label-width="120" prop="vaccine_explain">
          <el-input v-model="addForm.vaccine_explain" placeholder="请输入注射说明"></el-input>
        </el-form-item>
      </el-form>
    </Drawer>
  </div>
</template>

<script setup>
import { getVaccineInfo, getVaccineInfoBy, addVaccineInfo, deleteVaccineInfo, updateVaccineInfo } from '@/api/vaccine.js'
import { getVaccineTypeInfo } from '@/api/vaccineType.js'
import Drawer from '@/components/drawer.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import { notice } from '@/utils.js'
const vaccine_list = ref([])

const form = reactive({
  pageNo: 1,
  pageSize: 5
})
const total = ref(0)

// 获取数据
const getDataList = () => {
  getVaccineInfo(form).then(res => {
    if (res.code === 0) {
      total.value = res.total_count
      vaccine_list.value = []
      vaccine_list.value.push(...res.data)
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
  vaccine_name: '',
  vaccine_batch: '',
  vaccine_categroy: ''
})
const queryHandler = () => {
  getVaccineInfoBy(queryFrom).then(res => {
    // console.log(res)
    if (res.data.length === 0) {
      notice({ type: 'info', message: '未查询到数据' })
      queryFrom.id = ''
      ;(queryFrom.vaccine_name = ''), (queryFrom.vaccine_batch = ''), (queryFrom.vaccine_categroy = '')
      getDataList()
      return
    } else {
      vaccine_list.value = []
      vaccine_list.value = res.data
      queryFrom.id = ''
      ;(queryFrom.vaccine_name = ''), (queryFrom.vaccine_batch = ''), (queryFrom.vaccine_categroy = '')
    }
  })
}

// 抽屉
const drawer = ref(false)
const title = ref('')
const drawerRef = ref(null)
const addHanddler = () => {
  drawer.value = true
  title.value = '添加疫苗信息'
  getVaccineType()
}
const cancelHandler = () => {
  drawer.value = false
  drawerRef.value.resetFields()
}
const comfirmHandler = () => {
  addVaccineInfo(addForm).then(res => {
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
  vaccine_name: '',
  vaccine_batch: '',
  vaccine_categroy: '',
  vaccine_img: '',
  vaccine_manufacturer: '',
  vaccine_productDate: '',
  vaccine_overdueDate: '',
  vaccine_standard: '',
  vaccine_explain: ''
})
const vaccineCategroyOptions = reactive([
  {
    id: 1,
    value: '全病毒灭活疫苗'
  },
  {
    id: 2,
    value: '病毒载体疫苗'
  },
  {
    id: 3,
    value: '蛋白亚单位疫苗'
  },
  {
    id: 4,
    value: '核酸类疫苗'
  },
  {
    id: 5,
    value: '病毒样颗粒疫苗'
  },
  {
    id: 6,
    value: '减毒活疫苗'
  }
])
const getVaccineType = () => {
  getVaccineTypeInfo().then(res => {
    if (res.code === 0) {
      vaccineCategroyOptions.length = 0
      vaccineCategroyOptions.push(...res.data)
    }
  })
}

const selectChangeCategroyHandler = val => {
  addForm.vaccine_categroy = val
}
// 时间
const timeValue = ref('')
const changeTimeHandler = value => {
  console.log(value)
  let start_date = new Date(value[0])
  let start_Y = start_date.getFullYear()
  let start_M = start_date.getMonth() + 1
  let start_d = start_date.getDate()
  let startDay = `${start_Y.toString()}-${start_M.toString()}-${start_d.toString()}`
  let end_date = new Date(value[1])
  let end_Y = end_date.getFullYear()
  let end_M = end_date.getMonth() + 1
  let end_d = end_date.getDate()
  let endDay = `${end_Y.toString()}-${end_M.toString()}-${end_d.toString()}`
  addForm.vaccine_productDate = startDay
  addForm.vaccine_overdueDate = endDay
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
  deleteVaccineInfo({ id: Array.from(deleteArr.value) }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
    }
  })
}
const confirmDeleteOne = row => {
  console.log(row)
  deleteVaccineInfo({ id: row.id }).then(res => {
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
  console.log(row)
  id.value = row.id
  addForm.vaccine_name = row.vaccine_name
  addForm.vaccine_batch = row.vaccine_batch
  addForm.vaccine_categroy = row.vaccine_categroy
  addForm.vaccine_img = row.vaccine_img
  addForm.vaccine_manufacturer = row.vaccine_manufacturer
  addForm.vaccine_productDate = row.vaccine_productDate
  addForm.vaccine_overdueDate = row.vaccine_overdueDate
  addForm.vaccine_standard = row.vaccine_standard
  addForm.vaccine_explain = row.vaccine_explain
  updateDrawer.value = true
}
const cancelUpdateHandler = () => {
  updateDrawer.value = false
}
const confirmUpdateHandler = () => {
  updateVaccineInfo({ id: id.value, ...addForm }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      updateDrawer.value = false
      getDataList()
    }
  })
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
