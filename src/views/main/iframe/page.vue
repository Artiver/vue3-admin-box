<template>
  <div class="div_style">
    <p>page{{id}}</p>
<!--    <iframe class="iframe_style" :src="url"></iframe>-->
  </div>
</template>

<script setup lang="js">
import {useRoute} from "vue-router";

const route = useRoute();

// 使用iframe时需要用route取参数，而不是props
const id = route.params.id;

const url = document.location.protocol + "//" + "127.0.0.1:7899";

</script>

<style scoped lang="scss">
.div_style {
  width: 100%;
}
.iframe_style {
  width: 100%;
}
</style>