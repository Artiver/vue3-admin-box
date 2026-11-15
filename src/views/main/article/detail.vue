<template>
  <el-col :span="12">
    <p>Article：{{ id }}</p>
    <el-input
        v-model="textarea"
        :rows="10"
        type="textarea"
        placeholder="Please input"
    />
  </el-col>
</template>

<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  id?: string;
}>()

const textarea = ref("");
</script>

<style scoped lang="scss">

</style>