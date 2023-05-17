<template>
  <div>
    <!-- 导出数据 -->
    <el-dialog v-model="props.isShow" title="导出数据预览">
      <slot></slot>
      <template #footer>
        <el-button type="primary" @click="$emit('comfirmHandler')">确认导出</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  isShow: Boolean
})
</script>

<style lang="scss" scoped></style>
