<template>
  <el-row>
    <el-col :span="2">
      <div class="app-container" id="stencil"></div>
    </el-col>
    <el-col :span="22">
      <div class="app-container" id="topology"></div>
    </el-col>
  </el-row>
</template>

<script setup lang="js">
import {h, onMounted} from "vue"
import {Graph} from "@antv/x6"
import {Stencil} from '@antv/x6-plugin-stencil'

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

let graph = null

function initialGraph() {
  graph = new Graph({
    container: document.getElementById('topology'),
    background: {
      color: '#F2F7FA',
    },
  })
  graph.fromJSON(data)
}

function registerAddons() {
  const stencil = new Stencil({
    target: graph,
    groups: [
      {
        name: 'group1',
      },
      {
        name: 'group2',
      },
    ],
  })
  const rect1 = graph.createNode({
    shape: 'rect',
    width: 50,
    height: 40,
  })
  const rect2 = rect1.clone()
  const rect3 = graph.createNode({
    shape: 'ellipse',
    width: 50,
    height: 40,
  })
  const rect4 = rect3.clone()
  document.getElementById('stencil').appendChild(stencil.container)
  stencil.load([rect1, rect2], 'group1')
  stencil.load([rect3, rect4], 'group2')
}

function handleNodeContextmenu(e, cell) {
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
          console.log(cell)
        },
      },
    ],
  })
}

function registerEvents() {
  graph.on("node:contextmenu", ({e, x, y, cell, view}) => {
    handleNodeContextmenu(e, cell)
  })
}

onMounted(() => {
  initialGraph()
  registerEvents()
  registerAddons()
})

</script>

<style scoped lang="scss">
.app-container {
  height: 91vh;
}
</style>