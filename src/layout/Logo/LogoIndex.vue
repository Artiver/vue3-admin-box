<template>
  <div class="logo-container">
    <el-space :size="10">
      <img src="@/assets/svg/computer.svg" alt="logo">
      <h1 v-if="!appStore.isCollapse">{{ systemTitle }}</h1>
    </el-space>
  </div>
</template>

<script setup lang="js">
import {systemTitle} from "@/config/index.js";
import {useAppStore} from "@/stores/app.js";

const appStore = useAppStore();
</script>

<style scoped lang="scss">
.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--system-logo-background);

  img {
    height: 20px;
    width: 20px;
  }

  h1 {
    font-size: 18px;
    white-space: nowrap;
    color: var(--system-logo-color);
  }
}
</style>