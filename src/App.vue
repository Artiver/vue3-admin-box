<template>
  <el-config-provider :size="appStore.elementSize" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import {useAppStore} from "@/stores/app";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const appStore = useAppStore();
</script>

<style lang="scss">
@import "lxgw-wenkai-screen-web/style.css";

body {
  font-family: "LXGW WenKai Screen", "Microsoft YaHei", serif;
}
</style>
