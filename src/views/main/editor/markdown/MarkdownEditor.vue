<script setup lang="js">
import { ref, onMounted } from 'vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

const vditor = ref()

onMounted(() => {
  vditor.value = new Vditor('markdown-editor',{
    cdn: '/static/markdown'
  })
})
</script>

<template>
  <div class="app-container">
    <div id="markdown-editor"></div>
  </div>
</template>

<style scoped lang="scss">

</style>