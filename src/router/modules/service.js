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
        meta: {title: '仪表盘', icon: 'House', cache: false, hideClose: true}
      }
    ]
  },
  {
    path: '/editor',
    component: Layout,
    redirect: '/dashboard',
    meta: {title: '编辑器', icon: 'Edit'},
    children: [
      {
        path: 'markdown',
        component: createNameComponent(() => import('@/views/main/editor/markdown/MarkdownEditor.vue')),
        meta: {title: 'Markdown', icon: 'Notebook', cache: true, hideClose: false}
      },
      {
        path: 'monaco',
        component: createNameComponent(() => import('@/views/main/editor/code/MonacoEditorIndex.vue')),
        meta: {title: 'VSCode', icon: 'Notebook', cache: true, hideClose: false}
      },
      {
        path: 'x6',
        component: createNameComponent(() => import('@/views/main/editor/topology/X6EditorIndex.vue')),
        meta: {title: 'X6Editor', icon: 'Notebook', cache: true, hideClose: false}
      },
    ]
  }
]

export default route