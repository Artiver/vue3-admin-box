<template>
  <div class="div_style">
    <p>page2</p>
    <iframe class="iframe_style" :src="url"></iframe>
  </div>
</template>

<script setup lang="js">

const url = document.location.protocol + "//" + document.location.host;

</script>

<style scoped lang="scss">
.div_style {
  width: 100%;
  height: 99%;
}
.iframe_style {
  width: 100%;
  height: 95%;
}
</style>