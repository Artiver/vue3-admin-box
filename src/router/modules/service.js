import Layout from "@/layout/TabsIndex.vue";
import {createNameComponent} from "../createNode.js";

const route = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {title: "首页", icon: "House"},
    children: [
      {
        path: "dashboard",
        component: createNameComponent(() => import("@/views/main/dashboard/dashboardMenu.vue")),
        meta: {title: "仪表盘", icon: "House", cache: false, hideClose: true}
      }
    ]
  },
  {
    path: "/editor",
    component: Layout,
    redirect: "/dashboard",
    meta: {title: "编辑器", icon: "Edit"},
    children: [
      {
        path: "markdown",
        component: createNameComponent(() => import("@/views/main/editor/markdown/MarkdownEditor.vue")),
        meta: {title: "Markdown", icon: "Notebook", cache: true, hideClose: false}
      },
      {
        path: "richText",
        component: createNameComponent(() => import("@/views/main/editor/richText/WangEditor.vue")),
        meta: {title: "RichText", icon: "Notebook", cache: true, hideClose: false}
      },
      {
        path: "monaco",
        component: createNameComponent(() => import("@/views/main/editor/monaco/MonacoEditorIndex.vue")),
        meta: {title: "Monaco", icon: "Notebook", cache: true, hideClose: false}
      },
      {
        path: "x6editor",
        component: createNameComponent(() => import("@/views/main/editor/topology/X6EditorIndex.vue")),
        meta: {title: "X6Editor", icon: "Notebook", cache: true, hideClose: false}
      },
    ]
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/dashboard",
    meta: {title: "列表", icon: "Notebook"},
    children: [
      {
        path: "list",
        component: createNameComponent(() => import("@/views/main/article/list.vue")),
        meta: {title: "Article", icon: "Notebook", cache: true, hideClose: false}
      },
      {
        path: "detail/:id",
        component: createNameComponent(() => import("@/views/main/article/detail.vue")),
        hideMenu: true,
        meta: {title: "Detail", icon: "Notebook", cache: true, hideClose: false},
        props: true
      },
    ]
  },
  {
    path: "/iframe",
    component: Layout,
    redirect: "/dashboard",
    meta: {title: "嵌套页面", icon: "Notebook"},
    children: [
      {
        path: "page",
        component: createNameComponent(() => import("@/views/main/iframe/index.vue")),
        meta: {title: "Iframe", icon: "Notebook", cache: true, hideClose: false},
      },
      {
        path: "page/:id",
        component: createNameComponent(() => import("@/views/main/iframe/page.vue")),
        meta: {title: "Page", icon: "Notebook", cache: true, iframe: true, hideClose: false},
        hideMenu: true,
        props: true
      }
    ]
  }
]

export default route