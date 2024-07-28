<script setup lang="js">
import "animate.css"
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
    <h1 id="markdown-title" class="animate__animated animate__flash">Title</h1>
    <div id="markdown-editor"></div>
  </div>
</template>

<style scoped lang="scss">
#markdown-title {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>