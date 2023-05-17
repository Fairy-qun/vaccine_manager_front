<template>
  <div class="main">
    <div class="find_item">
      <div class="left">
        <el-row>
          <el-col :span="6">
            <el-input v-model="queryFrom.id" placeholder="请输入ID查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.inoculatePoint_name" placeholder="请输入名称查询" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryFrom.inoculatePoint_address" placeholder="请输入地址查询" clearable></el-input>
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
      <el-table :data="inoculatePoint_list" border stripe>
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="inoculatePoint_name" label="接种点名称"></el-table-column>
        <el-table-column prop="inoculatePoint_address" label="接种点地址"></el-table-column>
        <el-table-column prop="inoculatePoint_state" label="状态">
          <template #default="scoped">
            <el-tag type="success" v-if="scoped.row.inoculatePoint_state">启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
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
        <el-form-item label="接种点名称" label-width="120" prop="inoculatePoint_name">
          <el-input v-model="addForm.inoculatePoint_name" placeholder="请输入接种点名称"></el-input>
        </el-form-item>
        <el-form-item label="接种点地址" label-width="120" prop="inoculatePoint_address">
          <el-input v-model="addForm.inoculatePoint_address" placeholder="请输入接种点地址"></el-input>
        </el-form-item>
        <el-form-item label="接种点状态" label-width="120" prop="inoculatePoint_state">
          <el-switch v-model="addForm.inoculatePoint_state" @change="changeStateHandler"></el-switch>
        </el-form-item>
      </el-form>
    </Drawer>

    <!-- 更新抽屉 -->
    <Drawer :drawer="updateDrawer" :title="updateTitle" @cancelHandler="cancelUpdateHandler" @comfirmHandler="confirmUpdateHandler">
      <el-form :model="updateForm" ref="drawerRef">
        <el-form-item label="接种点名称" label-width="120" prop="inoculatePoint_name">
          <el-input v-model="updateForm.inoculatePoint_name" placeholder="请输入接种点名称"></el-input>
        </el-form-item>
        <el-form-item label="接种点地址" label-width="120" prop="inoculatePoint_address">
          <el-input v-model="updateForm.inoculatePoint_address" placeholder="请输入接种点地址"></el-input>
        </el-form-item>
        <el-form-item label="接种点状态" label-width="120" prop="inoculatePoint_state">
          <el-switch v-model="updateForm.inoculatePoint_state" @change="changeStateUpdateHandler"></el-switch>
        </el-form-item>
      </el-form>
    </Drawer>
  </div>
</template>

<script setup>
import { getInoculatePointInfo, getInoculatePointInfoBy, addInoculatePointInfo, deleteInoculatePointInfo, updateInoculatePointInfo } from '@/api/inoculatePoint.js'
import Drawer from '@/components/drawer.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import { notice } from '@/utils.js'
const inoculatePoint_list = ref([])

const form = reactive({
  pageNo: 1,
  pageSize: 5
})
const total = ref(0)

// 获取数据
const getDataList = () => {
  getInoculatePointInfo(form).then(res => {
    if (res.code === 0) {
      total.value = res.total_count
      inoculatePoint_list.value = []
      inoculatePoint_list.value.push(...res.data)
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
  inoculatePoint_name: '',
  inoculatePoint_address: ''
})
const queryHandler = () => {
  getInoculatePointInfoBy(queryFrom).then(res => {
    // console.log(res)
    if (res.data.length === 0) {
      notice({ type: 'info', message: '未查询到数据' })
      queryFrom.id = ''
      queryFrom.inoculatePoint_name = ''
      queryFrom.inoculatePoint_address = ''
      getDataList()
      return
    } else {
      inoculatePoint_list.value = []
      inoculatePoint_list.value = res.data
      queryFrom.id = ''
      queryFrom.inoculatePoint_name = ''
      queryFrom.inoculatePoint_address = ''
    }
  })
}

// 抽屉
const drawer = ref(false)
const title = ref('')
const drawerRef = ref(null)
const addHanddler = () => {
  drawer.value = true
  title.value = '添加接种点信息'
}
const cancelHandler = () => {
  drawer.value = false
  drawerRef.value.resetFields()
}
const changeStateHandler = val => {
  addForm.inoculatePoint_state = val
}
const comfirmHandler = () => {
  addInoculatePointInfo(addForm).then(res => {
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
  inoculatePoint_name: '',
  inoculatePoint_address: '',
  inoculatePoint_state: false
})

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
  deleteInoculatePointInfo({ id: Array.from(deleteArr.value) }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
    }
  })
}
const confirmDeleteOne = row => {
  console.log(row)
  deleteInoculatePointInfo({ id: row.id }).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      getDataList()
    }
  })
}

// 更新数据
const updateForm = reactive({
  inoculatePoint_name: '',
  inoculatePoint_address: '',
  inoculatePoint_state: ''
})
const updateTitle = ref('更新数据')
const updateDrawer = ref(false)
const id = ref('')
const updateHandler = row => {
  id.value = row.id
  updateForm.inoculatePoint_name = row.inoculatePoint_name
  updateForm.inoculatePoint_address = row.inoculatePoint_address
  updateForm.inoculatePoint_state = row.inoculatePoint_state

  updateDrawer.value = true
}
const changeStateUpdateHandler = val => {
  updateForm.inoculatePoint_state = val
  console.log(updateForm.inoculatePoint_state)
}
const cancelUpdateHandler = () => {
  updateDrawer.value = false
}
const confirmUpdateHandler = () => {
  console.log(updateForm)
  updateInoculatePointInfo({ id: id.value, inoculatePoint_name: updateForm.inoculatePoint_name, inoculatePoint_address: updateForm.inoculatePoint_address, inoculatePoint_state: updateForm.inoculatePoint_state }).then(res => {
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
