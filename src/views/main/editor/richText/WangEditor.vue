<template>
  <div class="app-container">
    <Toolbar class="toolbar-style"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor class="editor-style"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="js">
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()
const mode = ref("default")
const valueHtml = ref('<h1>hello</h1>')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})

const handleCreated = (editor) => {
  editorRef.value = editor
}
</script>

<style scoped lang="scss">
.toolbar-style {
  border-bottom: 1px solid #ccc
}
.editor-style {
  height: 91vh;
  overflow-y: hidden;
}
</style>