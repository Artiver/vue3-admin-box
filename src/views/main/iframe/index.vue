<template>
  <h1>hello, iframe</h1>
  <iframe class="iframe_style" :src="url"></iframe>
</template>

<script setup lang="js">

const props = defineProps({
  url: String,
});
</script>

<style scoped lang="scss">
.iframe_style {
  width: 100%;
  height: 99%;
}
</style>