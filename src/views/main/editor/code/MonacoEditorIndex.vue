<template>
  <el-button icon="Document" type="primary" plain @click="showContent">内容</el-button>
  <div id="codeEditBox"></div>
</template>

<script setup lang="js">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import * as monaco from 'monaco-editor'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import {ElNotification} from "element-plus";

const text = ref('const a = 1;')

self.MonacoEnvironment = {
  getWorker(id, label) {
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  },
}

let editor = null

function showContent() {
  const content = editor.getValue()
  ElNotification({
    title: 'Content',
    message: content,
    type: 'success',
  })
}

onMounted(() => {
  editor = monaco.editor.create(document.getElementById('codeEditBox'), {
    theme: 'vs',
    language: 'javascript',
    value: text.value,
  })
})

onBeforeUnmount(() => {
  editor.dispose()
})

onActivated(() => {
  editor.focus()
})
</script>

<style scoped lang="scss">
#codeEditBox {
  width: 100%;
  height: 95%;
}
</style>