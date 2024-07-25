<script setup lang="js">
import { ref, onMounted } from 'vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

const vditor = ref()

onMounted(() => {
  vditor.value = new Vditor('markdown-editor',{
    cdn: '/static/markdown',
    cache: {enable: false},
  })
})
</script>

<template>
  <div class="app-container">
    <div id="markdown-title">Title</div>
    <div id="markdown-editor"></div>
  </div>
</template>

<style scoped lang="scss">
#markdown-title {
  height: 50px;
  text-align: center;
}
</style>