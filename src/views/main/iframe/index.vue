<template>
  <el-button type="primary" plain @click="toPage(1)">Page1</el-button>
  <el-button type="success" plain @click="toPage(2)">Page2</el-button>
</template>

<script setup lang="js">
import {useRouter} from "vue-router";

const router = useRouter();

function toPage(id) {
  router.push({path: "/iframe/page/" + id});
}
</script>

<style scoped lang="scss">

</style>