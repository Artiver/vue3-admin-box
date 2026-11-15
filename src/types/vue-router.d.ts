import "vue-router";

declare module "vue-router" {
  /**
   * 项目中自定义的路由元信息
   */
  interface RouteMeta {
    title?: string; // 菜单/标签页/页面标题
    icon?: string; // 菜单图标（element-plus 图标组件名）
    cache?: boolean; // 是否 keep-alive 缓存
    hideClose?: boolean; // 标签页是否隐藏关闭按钮
    hideTabs?: boolean; // 是否不显示在标签页中
    hideMenu?: boolean; // 是否隐藏菜单项
    iframe?: boolean; // 是否以 iframe 方式渲染
    activeMenu?: string; // 高亮的菜单路径
    breadcrumb?: boolean; // 是否显示在面包屑中
  }
}

export {};
