<template>
  <div>
    <el-row>
      <el-col :span="20">
        <h4>添加接种信息</h4>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="20">
        <el-form :model="form">
          <el-form-item label="疫苗批次" label-width="100px">
            <el-row>
              <el-col :span="16">
                <el-input v-model="form.vaccine_batch" placeholder="疫苗批号"></el-input>
              </el-col>
              <el-col :span="6" style="margin-left: 10px">
                <el-button type="primary" @click="selectVaccineHandler">选择信息</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="疫苗名称" label-width="100px">
            <el-row>
              <el-col :span="20">
                <el-input v-model="form.inoculate_name" placeholder="疫苗名称"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="用户名" label-width="100px">
            <el-row>
              <el-col :span="16">
                <el-input v-model="form.resident_name" placeholder="居民"></el-input>
              </el-col>
              <el-col :span="6" style="margin-left: 10px">
                <el-button type="primary" @click="selectResidentHandler">选择信息</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="接种地址" label-width="100px">
            <el-row>
              <el-col :span="16">
                <el-input v-model="form.inoculatePoint_address" placeholder="接种地址"></el-input>
              </el-col>
              <el-col :span="6" style="margin-left: 10px">
                <el-button type="primary" @click="selectInoculatePointHandler">选择信息</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="接种点名称" label-width="100px">
            <el-row>
              <el-col :span="20">
                <el-input v-model="form.inoculatePoint_name" placeholder="接种点名称"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="接种时间" label-width="100px">
            <el-row>
              <el-col :span="20">
                <el-date-picker v-model="form.inoculate_date" type="date" placeholder="接种日期" @change="changeTimeHandler" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" style="margin-left: 140px">
        <el-button type="primary" @click="addInoculateHandler">立即提交</el-button>
      </el-col>
    </el-row>

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
        <el-pagination v-model:current-page="formPage.pageNo" v-model:page-size="formPage.pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-dialog>
    <!-- 居民表单对话框 -->
    <el-dialog v-model="dialogResident" title="信息选择">
      <el-table :data="gridResidentData" stripe border @cell-click="cellResidentClick">
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
      </el-table>
      <!-- 分页操作 -->
      <div class="pagination" style="margin-top: 10px">
        <el-pagination v-model:current-page="formPageResident.pageNo" v-model:page-size="formPageResident.pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total_resident" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-dialog>
    <!-- 接种点表单对话框 -->
    <el-dialog v-model="dialogInoculatePoint" title="信息选择">
      <el-table :data="gridInoculatePointData" stripe border @cell-click="cellInoculatePointClick">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="inoculatePoint_name" label="接种点名称"></el-table-column>
        <el-table-column prop="inoculatePoint_address" label="接种点地址"></el-table-column>
        <el-table-column prop="inoculatePoint_state" label="状态">
          <template #default="scoped">
            <el-tag type="success" v-if="scoped.row.inoculatePoint_state">启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页操作 -->
      <div class="pagination" style="margin-top: 10px">
        <el-pagination
          v-model:current-page="formPageResident.pageNo"
          v-model:page-size="formPageResident.pageSize"
          :page-sizes="[2, 5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_inoculatePoint"
          @size-change="handleSizeinoculatePointChange"
          @current-change="handleCurrentinoculatePointChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getVaccineInfo } from '@/api/vaccine.js'
import { getResidentInfo } from '@/api/resident.js'
import { addInoculateInfo } from '@/api/inoculate.js'
import { getInoculatePointInfo } from '@/api/inoculatePoint.js'
import { reactive, ref } from 'vue'
import { notice } from '@/utils.js'
const form = reactive({
  vaccine_batch: '',
  inoculate_name: '',
  resident_name: '',
  inoculate_date: '',
  inoculatePoint_address: '',
  inoculatePoint_name: ''
})

const formPage = reactive({
  pageNo: 1,
  pageSize: 5
})
const total = ref(0)

const dialogVaccine = ref(false)
const selectVaccineHandler = () => {
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
      total.value = res.total_count
    }
  })
}
// 分页
const handleSizeChange = val => {
  formPage.pageSize = val
  getVaccineData()
}
const handleCurrentChange = val => {
  formPage.pageNo = val
  getVaccineData()
}

// 单元格被点击之后
const cellClick = row => {
  form.vaccine_batch = row.vaccine_batch
  form.inoculate_name = row.vaccine_name
  dialogVaccine.value = false
}

// 选择居民信息
const dialogResident = ref(false)
const selectResidentHandler = () => {
  dialogResident.value = true
  getResident()
}
// 获取居民信息
const formPageResident = reactive({
  pageNo: 1,
  pageSize: 5
})
const gridResidentData = ref([])
const total_resident = ref(0)
const getResident = () => {
  getResidentInfo(formPageResident).then(res => {
    if (res.code === 0) {
      gridResidentData.length = 0
      gridResidentData.value.push(...res.data)
      total_resident.value = res.total_count
    }
  })
}
const cellResidentClick = row => {
  // console.log(row)
  form.resident_name = row.resident_name
  dialogResident.value = false
}
// 立即提交
const addInoculateHandler = () => {
  addInoculateInfo(form).then(res => {
    if (res.code === 0) {
      notice({ message: res.msg })
      form.vaccine_batch = ''
      form.inoculate_name = ''
      form.resident_name = ''
      form.inoculate_date = ''
      form.inoculatePoint_address = ''
      form.inoculatePoint_name = ''
    }
  })
}
// 格式化时间
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
  form.inoculate_date = startDay
}

// 选择接种点
const formInoculatePoint = reactive({
  pageNo: 1,
  pageSize: 5
})
const dialogInoculatePoint = ref(false)
const gridInoculatePointData = reactive([])
const total_inoculatePoint = ref(0)
// 获取接种点信息
const getInoculatePoint = () => {
  getInoculatePointInfo(formInoculatePoint).then(res => {
    if (res.code === 0) {
      gridInoculatePointData.length = 0
      gridInoculatePointData.push(...res.data)
      total_inoculatePoint.value = res.total_count
    }
  })
}
const selectInoculatePointHandler = () => {
  dialogInoculatePoint.value = true
  getInoculatePoint()
}
const handleSizeinoculatePointChange = val => {
  formInoculatePoint.pageSize = val
  getInoculatePoint()
}
const handleCurrentinoculatePointChange = val => {
  formInoculatePoint.pageNo = val
  getInoculatePoint()
}
const cellInoculatePointClick = row => {
  if (!row.inoculatePoint_state) {
    notice({ type: 'error', message: '该接种点不可用' })
  } else {
    form.inoculatePoint_address = row.inoculatePoint_address
    form.inoculatePoint_name = row.inoculatePoint_name
    dialogInoculatePoint.value = false
  }
}
</script>

<style lang="scss" scoped></style>
