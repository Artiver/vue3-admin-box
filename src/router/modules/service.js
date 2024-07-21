import Layout from '@/layout/TabsIndex.vue'
import {createNameComponent} from '../createNode'

const route = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {title: '首页', icon: 'House'},
    children: [
      {
        path: 'dashboard',
        component: createNameComponent(() => import('@/views/main/dashboard/dashboardMenu.vue')),
        meta: {title: '仪表盘', icon: 'House', hideClose: true}
      }
    ]
  },
  {
    path: '/common',
    component: Layout,
    redirect: '/dashboard',
    meta: {title: '常用', icon: 'Tickets', cache: "true"},
    children: [
      {
        path: 'table',
        component: createNameComponent(() => import('@/views/main/table/tableMenu.vue')),
        meta: {title: '表格', icon: 'Tickets', hideClose: false}
      },
      {
        path: 'chart',
        component: createNameComponent(() => import('@/views/main/table/tableMenu.vue')),
        meta: {title: '图表', icon: 'Tickets', hideClose: false}
      }
    ]
  },
  {
    path: '/editor',
    component: Layout,
    redirect: '/dashboard',
    meta: {title: '编辑器', icon: 'Edit', cache: "true"},
    children: [
      {
        path: 'monaco',
        component: createNameComponent(() => import('@/views/main/editor/code/MonacoEditorIndex.vue')),
        meta: {title: 'VSCode', icon: 'Notebook', hideClose: false}
      },
      {
        path: 'x6',
        component: createNameComponent(() => import('@/views/main/editor/topology/X6EditorIndex.vue')),
        meta: {title: '拓扑图', icon: 'EditPen', hideClose: false}
      },
    ]
  }
]

export default route