<template>
  <el-button type="primary" plain @click="toPage(1)">Page1</el-button>
  <el-button type="success" plain @click="toPage(2)">Page2</el-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();

function toPage(id: number) {
  router.push({path: "/iframe/page/" + id});
}
</script>

<style scoped lang="scss">

</style>