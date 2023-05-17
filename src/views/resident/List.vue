<template>
  <div class="main">
    <!-- 导出数据 -->
    <div>
      <el-button type="primary" @click="exportHandler" size="small">导出数据</el-button>
      <el-button type="primary" @click="importHandler" size="small">导入数据</el-button>
    </div>
    <div class="find_item">
      <div class="left">
        <el-row>
          <el-col :span="6">
            <el-input v-model="queryFrom.id" placeholder="请输入ID查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.resident_mobile" placeholder="请输入手机号查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.resident_name" placeholder="请输入姓名查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.resident_numberId" placeholder="请输入身份证查询" clearable></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <el-row>
          <el-col :span="6">
            <el-button type="primary" @click="queryHandler">查询</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="addHanddler">添加</el-button>
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
      <el-table :data="resident_list" border stripe @select="selectTableHandler">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="resident_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="resident_gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="resident_age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="resident_mobile" label="手机号" width="100"></el-table-column>
        <el-table-column prop="resident_numberId" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="resident_address" label="居住地址" width="220"></el-table-column>
        <el-table-column prop="resident_isInoculateFirst" label="接种一针剂" width="100"></el-table-column>
        <el-table-column prop="resident_isInoculateSecond" label="接种二针剂" width="100"></el-table-column>
        <el-table-column prop="resident_isInoculateThird" label="接种加强针" width="100"></el-table-column>
        <el-table-column label="操作" width="180">
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
    <!-- 添加抽屉 -->
    <Drawer :drawer="drawer" :title="title" @cancelHandler="cancelHandler" @comfirmHandler="comfirmHandler">
      <el-form :model="addForm" ref="drawerRef">
        <el-form-item label="姓名" label-width="120" prop="resident_name">
          <el-input v-model="addForm.resident_name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120" prop="resident_gender">
          <el-select v-model="gender_value" placeholder="请选择性别" @change="selectChangeHandler">
            <el-option v-for="item in genderOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="120" prop="resident_age">
          <el-input v-model="addForm.resident_age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120" prop="resident_mobile">
          <el-input v-model="addForm.resident_mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="120" prop="resident_numberId">
          <el-input v-model="addForm.resident_numberId" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="居住地址" label-width="120" prop="resident_address">
          <el-input v-model="addForm.resident_address" placeholder="请输入居住地址"></el-input>
        </el-form-item>
        <el-form-item label="接种第一针剂" label-width="120" prop="resident_isInoculateFirst">
          <el-select v-model="InoculateFirst_value" placeholder="请选择接种状态" @change="selectChangeFirstHandler">
            <el-option v-for="item in InoculateFirstOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="接种第二针剂" label-width="120" prop="resident_isInoculateSecond">
          <el-select v-model="InoculateSecond_value" placeholder="请选择接种状态" @change="selectChangeSecondHandler">
            <el-option v-for="item in InoculateSecondOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="接种第三针剂" label-width="120" prop="resident_isInoculateThird">
          <el-select v-model="InoculateThird_value" placeholder="请选择接种状态" @change="selectChangeThirdHandler">
            <el-option v-for="item in InoculateThirdOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </Drawer>

    <!-- 更新抽屉 -->
    <Drawer :drawer="updateDrawer" :title="updateTitle" @cancelHandler="cancelUpdateHandler" @comfirmHandler="confirmUpdateHandler">
      <el-form :model="addForm" ref="drawerRef">
        <el-form-item label="姓名" label-width="120" prop="resident_name">
          <el-input v-model="addForm.resident_name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120" prop="resident_gender">
          <el-select v-model="gender_value" placeholder="请选择性别" @change="selectChangeHandler">
            <el-option v-for="item in genderOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="120" prop="resident_age">
          <el-input v-model="addForm.resident_age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120" prop="resident_mobile">
          <el-input v-model="addForm.resident_mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="120" prop="resident_numberId">
          <el-input v-model="addForm.resident_numberId" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="居住地址" label-width="120" prop="resident_address">
          <el-input v-model="addForm.resident_address" placeholder="请输入居住地址"></el-input>
        </el-form-item>
        <el-form-item label="接种第一针剂" label-width="120" prop="resident_isInoculateFirst">
          <el-select v-model="InoculateFirst_value" placeholder="请选择接种状态" @change="selectChangeFirstHandler">
            <el-option v-for="item in InoculateFirstOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="接种第二针剂" label-width="120" prop="resident_isInoculateSecond">
          <el-select v-model="InoculateSecond_value" placeholder="请选择接种状态" @change="selectChangeSecondHandler">
            <el-option v-for="item in InoculateSecondOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="接种第三针剂" label-width="120" prop="resident_isInoculateThird">
          <el-select v-model="InoculateThird_value" placeholder="请选择接种状态" @change="selectChangeThirdHandler">
            <el-option v-for="item in InoculateThirdOptions" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </Drawer>
    <!-- 导出数据 -->
    <ExportTable :isShow="isShow" @comfirmHandler="comfirmExportHandler">
      <el-table :data="exportList" id="out-table">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="resident_name" label="姓名"></el-table-column>
        <el-table-column prop="resident_gender" label="性别"></el-table-column>
        <el-table-column prop="resident_age" label="年龄"></el-table-column>
        <el-table-column prop="resident_mobile" label="手机号" width="100"></el-table-column>
        <el-table-column prop="resident_numberId" label="身份证" width="200"></el-table-column>
        <el-table-column prop="resident_address" label="居住地址" width="200"></el-table-column>
        <el-table-column prop="resident_isInoculateFirst" label="是否接种第一针"></el-table-column>
        <el-table-column prop="resident_isInoculateSecond" label="是否接种第二针"></el-table-column>
        <el-table-column prop="resident_isInoculateThird" label="是否接种第三针"></el-table-column>
      </el-table>
    </ExportTable>

    <!-- 导入数据 -->
    <el-dialog v-model="dialogTableImportVisible" title="数据导入">
      <el-upload class="upload-demo" drag action multiple :auto-upload="false" :on-change="handleChange" accept=".xlsx,.xls">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖到此处上传 或者 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">只允许上传.xlsx,.xls格式文件</div>
        </template>
      </el-upload>
      <template #footer>
        <el-button type="primary" @click="confirmImport">确认导入数据</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import * as xlsx from 'xlsx'
import { getResidentInfo, getResidentInfoBy, addResidentInfo, deleteResidentInfo, updateResidentInfo, exportVaccineInfo } from '@/api/resident.js'
import Drawer from '@/components/drawer.vue'
import ExportTable from '@/components/exportTable.vue'
import { reactive, ref, onMounted } from 'vue'
import { notice } from '@/utils.js'
import { useExportTable } from '@/hooks/useExportTable.js'
const { exportExcelList } = useExportTable()
const resident_list = ref([])

const form = reactive({
  pageNo: 1,
  pageSize: 8
})
const total = ref(0)

// 获取数据
const getDataList = () => {
  getResidentInfo(form).then(res => {
    if (res.code === 0) {
      total.value = res.total_count
      resident_list.value = []
      resident_list.value.push(...res.data)
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
  resident_name: '',
  resident_mobile: '',
  resident_numberId: ''
})
const queryHandler = () => {
  getResidentInfoBy(queryFrom).then(res => {
    //
    resident_list.value = []
    resident_list.value = res.data
    queryFrom.id = ''
    ;(queryFrom.resident_name = ''), (queryFrom.resident_mobile = ''), (queryFrom.resident_numberId = '')
  })
}

// 抽屉
const drawer = ref(false)
const title = ref('')
const drawerRef = ref(null)
const addHanddler = () => {
  drawer.value = true
  title.value = '添加居民信息'
}
const cancelHandler = () => {
  drawer.value = false
  drawerRef.value.resetFields()
}
const comfirmHandler = () => {
  addResidentInfo(addForm).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
      drawer.value = false
      drawerRef.value.resetFields()
    }
  })
}

// 添加数据
const addForm = reactive({
  resident_name: '',
  resident_gender: '',
  resident_age: '',
  resident_mobile: '',
  resident_numberId: '',
  resident_address: '',
  resident_isInoculateFirst: '',
  resident_isInoculateSecond: '',
  resident_isInoculateThird: ''
})
const gender_value = ref('')
const InoculateFirst_value = ref('')
const InoculateSecond_value = ref('')
const InoculateThird_value = ref('')
const genderOptions = reactive([
  {
    id: 1,
    value: '男'
  },
  {
    id: 2,
    value: '女'
  }
])
const InoculateFirstOptions = reactive([
  {
    id: 1,
    value: '是'
  },
  {
    id: 2,
    value: '否'
  }
])
const InoculateSecondOptions = reactive([
  {
    id: 1,
    value: '是'
  },
  {
    id: 2,
    value: '否'
  }
])
const InoculateThirdOptions = reactive([
  {
    id: 1,
    value: '是'
  },
  {
    id: 2,
    value: '否'
  }
])
const selectChangeHandler = val => {
  addForm.resident_gender = val
}
const selectChangeFirstHandler = val => {
  addForm.resident_isInoculateFirst = val
}
const selectChangeSecondHandler = val => {
  addForm.resident_isInoculateSecond = val
}
const selectChangeThirdHandler = val => {
  addForm.resident_isInoculateThird = val
}

const deleteArr = ref([])
// 选择数据
const selectTableHandler = (selection, row) => {
  deleteArr.value = []
  selection.forEach(item => {
    deleteArr.value.push(item.id)
  })
  deleteArr.value = [...new Set(Array.from(deleteArr.value))]
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
  deleteResidentInfo({ id: Array.from(deleteArr.value) }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
    }
  })
}
const confirmDeleteOne = row => {
  deleteResidentInfo({ id: row.id }).then(res => {
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
  id.value = row.id
  addForm.resident_name = row.resident_name
  addForm.resident_gender = row.resident_gender
  addForm.resident_age = row.resident_age
  addForm.resident_mobile = row.resident_mobile
  addForm.resident_numberId = row.resident_numberId
  addForm.resident_address = row.resident_address
  addForm.resident_isInoculateFirst = row.resident_isInoculateFirst
  addForm.resident_isInoculateSecond = row.resident_isInoculateSecond
  addForm.resident_isInoculateThird = row.resident_isInoculateThird
  updateDrawer.value = true
}
const cancelUpdateHandler = () => {
  updateDrawer.value = false
}
const confirmUpdateHandler = () => {
  updateResidentInfo({ id: id.value, ...addForm }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      updateDrawer.value = false
      getDataList()
    }
  })
}

// 导出数据
const isShow = ref(false)
const exportList = ref([])
const exportHandler = () => {
  isShow.value = true
  exportVaccineInfo().then(res => {
    if (res.code === 0) {
      exportList.value.push(...res.data)
    }
  })
}
const comfirmExportHandler = () => {
  isShow.value = false
  exportExcelList('居民数据')
}

// 导入数据
const importList = reactive([])
const dialogTableImportVisible = ref(false)
const importHandler = () => {
  dialogTableImportVisible.value = true
}

const confirmImport = () => {
  sendBack(importList)
  notice({ message: '导入数据成功' })
  dialogTableImportVisible.value = false
  getDataList()
}
const addForm1 = reactive({
  resident_name: '',
  resident_gender: '',
  resident_age: '',
  resident_mobile: '',
  resident_numberId: '',
  resident_address: '',
  resident_isInoculateFirst: '',
  resident_isInoculateSecond: '',
  resident_isInoculateThird: ''
})
const sendBack = data => {
  data.forEach(item => {
    addForm1.resident_name = item['姓名']
    addForm1.resident_gender = item['性别']
    addForm1.resident_age = item['年龄']
    addForm1.resident_mobile = item['手机号']
    addForm1.resident_numberId = item['身份证号']
    addForm1.resident_address = item['居住地址']
    addForm1.resident_isInoculateFirst = item['接种一针剂'] ? item['接种一针剂'] : '是'
    addForm1.resident_isInoculateSecond = item['接种二针剂'] ? item['接种二针剂'] : '是'
    addForm1.resident_isInoculateThird = item['接种加强针'] ? item['接种加强针'] : '是'
    addResidentInfo(addForm1).then(res => {
      console.log(res)
    })
  })
}

const handleChange = async e => {
  const file = e.raw
  let data = await readFile(file)
  let workbook = xlsx.read(data, { type: 'binary' })
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const data1 = xlsx.utils.sheet_to_json(worksheet)
  importList.push(...data1)
}

// 将读取文件转换为二进制文件
const readFile = file => {
  return new Promise((resolve, rject) => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = ev => {
      resolve(ev.target.result)
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
