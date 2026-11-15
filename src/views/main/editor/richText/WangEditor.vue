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

<script setup lang="ts">
import {onBeforeUnmount, ref, shallowRef} from "vue";
import "@wangeditor/editor/dist/css/style.css";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import type {IDomEditor, IEditorConfig, IToolbarConfig} from "@wangeditor/editor";

const editorRef = shallowRef<IDomEditor>();
const mode = ref("default");
const valueHtml = ref("<h1>hello</h1>");

const toolbarConfig: Partial<IToolbarConfig> = {};
const editorConfig: Partial<IEditorConfig> = {placeholder: "请输入内容..."};

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) {
    editor.destroy();
  }
});
</script>

<style scoped lang="scss">
.toolbar-style {
  border-bottom: 1px solid #ccc
}

.editor-style {
  overflow-y: hidden;
}
</style>