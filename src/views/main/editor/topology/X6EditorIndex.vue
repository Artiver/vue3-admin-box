<template>
  <div id="topology"></div>
</template>

<script setup lang="js">
import {h, onMounted, ref} from "vue"
import {Graph} from "@antv/x6"

import ContextMenu from '@imengyu/vue3-context-menu'

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 140,
      y: 240,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 360,
      y: 480,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
}

let graph = ref(null)

function initialGraph() {
  graph = new Graph({
    container: document.getElementById('topology'),
    background: {
      color: '#F2F7FA',
    },
  })
  graph.fromJSON(data)
}

const handleNodeContextmenu = (e) => {
  ContextMenu.showContextMenu({
    x: e.pageX,
    y: e.pageY,
    items: [
      {
        label: h('div', {style: {color: '#003a85',}}, "刷新"),
        icon: h('img', {
          src: '/img/refresh.svg',
          style: {
            width: '15px',
            height: '15px',
          }
        }),
        onClick: () => {
          console.log(e)
        },
      },
      {
        label: h('div', {style: {color: '#003a85',}}, "复制"),
        onClick: () => {
          console.log(e)
        },
      },
      {
        label: h('div', {style: {color: '#003a85',}}, "剪切"),
        divided: true,
        onClick: () => {
          console.log(e)
        },
      },
      {
        label: h('div', {style: {color: '#8f0000',}}, "删除"),
        onClick: () => {
          console.log(e)
        },
      },
    ],
  })
}

function registerEvents() {
  graph.on("node:contextmenu", ({e, x, y, cell, view}) => {
    handleNodeContextmenu(e)
  })
}

onMounted(() => {
  initialGraph()
  registerEvents()
})

</script>

<style scoped lang="scss">
#topology {
  width: 100%;
  height: 90vh;
}
</style>