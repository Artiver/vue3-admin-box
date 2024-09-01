<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <div class="app" id="stencil"></div>
      </el-col>
      <el-col :span="22">
        <div class="app" id="topology"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="js">
import {h, onMounted} from "vue"
import {Graph} from "@antv/x6"
import {Stencil} from '@antv/x6-plugin-stencil'

import ContextMenu from '@imengyu/vue3-context-menu'
import x6Data from "./X6EditorData.js"

let graph = null

function initialGraph() {
  graph = new Graph({
    container: document.getElementById('topology'),
    background: {
      color: '#F2F7FA',
    },
  })
  graph.fromJSON(x6Data.drawData)
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
.app {
  height: 92vh;
}
</style>