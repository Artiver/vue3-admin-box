<template>
  <el-config-provider :size="appStore.elementSize" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="js">
import {useAppStore} from "@/stores/app.js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const appStore = useAppStore();
</script>

<style lang="scss">
@import "lxgw-wenkai-screen-web/style.css";

body {
  font-family: "LXGW WenKai Screen", "Microsoft YaHei", serif;
}
</style>
