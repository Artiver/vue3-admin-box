<template>
  <el-config-provider :size="appStore.elementSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="js">
import {useAppStore} from "@/stores/app.js"
const appStore = useAppStore()
</script>

<style lang="scss">
.app-container {
  width: 100%;
  height: 100%;
}
</style>
