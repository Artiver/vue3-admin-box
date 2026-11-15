<template>
  <div class="app-container">
    <el-button icon="Document" type="primary" plain @click="showContent">内容</el-button>
    <div id="codeEditBox"></div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, onActivated, ref} from "vue";
import * as monaco from "monaco-editor";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import {ElNotification} from "element-plus";

const text = ref("const a = 1;");

self.MonacoEnvironment = {
  getWorker(_id: string, label: string) {
    if (["typescript", "javascript"].includes(label)) {
      return new tsWorker();
    }
    return new EditorWorker();
  },
};

let editor: monaco.editor.IStandaloneCodeEditor | null = null;

function showContent() {
  const content = editor ? editor.getValue() : "";
  ElNotification({
    title: "Content",
    message: content,
    type: "success",
  });
}

onMounted(() => {
  editor = monaco.editor.create(document.getElementById("codeEditBox") as HTMLElement, {
    theme: "vs",
    language: "javascript",
    value: text.value,
  });
});

onBeforeUnmount(() => {
  editor?.dispose();
});

onActivated(() => {
  editor?.focus();
});
</script>

<style scoped lang="scss">
#codeEditBox {
  height: 90vh;
}
</style>