<template>
  <iframe class="iframe_style" :src="url"></iframe>
</template>

<script setup lang="js">

const url = "http://127.0.0.1:3001";

</script>

<style scoped lang="scss">
.iframe_style {
  width: 100%;
  height: 99%;
}
</style>