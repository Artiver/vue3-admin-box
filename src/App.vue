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
$default_font: "LXGW WenKai Screen";

#app {
  font-family: $default_font, "Microsoft YaHei", serif;
}
.app-container {
  font-family: $default_font, "Microsoft YaHei", serif;
  width: 100%;
  height: 100%;
}
</style>
