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
    path: '/editor',
    component: Layout,
    redirect: '/dashboard',
    meta: {title: '编辑器', icon: 'Edit', cache: "true"},
    children: [
      {
        path: 'markdown',
        component: createNameComponent(() => import('@/views/main/editor/markdown/MarkdownEditor.vue')),
        meta: {title: 'Markdown', icon: 'Notebook', hideClose: false}
      },
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