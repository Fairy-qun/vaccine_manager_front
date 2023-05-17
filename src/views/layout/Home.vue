<template>
  <div>
    <el-calendar>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
      <template #header="{ date }">
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-year')"> 上一年 </el-button>
          <el-button size="small" @click="selectDate('prev-month')"> 上个月 </el-button>
          <el-button size="small" @click="selectDate('today')">今天</el-button>
          <el-button size="small" @click="selectDate('next-month')"> 下个月 </el-button>
          <el-button size="small" @click="selectDate('next-year')"> 下一年 </el-button>
        </el-button-group>
      </template>
    </el-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const calendar = ref()
const selectDate = val => {
  calendar.value.selectDate(val)
}
</script>

<style lang="scss" scoped>
.is-selected {
  color: #1989fa;
}
</style>
