<template>
  <div>
    <!-- 抽屉对话框 -->
    <el-drawer v-model="props.drawer" :with-header="true" @close="closeDrawerHandler" :show-close="false" :modal="true" :close-on-click-modal="false">
      <template #header>
        <span>{{ props.title }}</span>
      </template>
      <slot></slot>
      <template #footer>
        <el-button type="info" @click="$emit('cancelHandler')">取消</el-button>
        <el-button type="primary" @click="$emit('comfirmHandler')">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
// 添加抽屉
const props = defineProps({
  drawer: Boolean,
  title: String
})

const closeDrawerHandler = () => {}
</script>

<style lang="scss" scoped></style>
