import type {Component} from "vue";
import type {RouteMeta, RouteRecordRedirectOption} from "vue-router";

/**
 * 项目路由记录，meta 必填，并允许额外的自定义字段
 */
export interface AppRouteRecordRaw {
  path: string;
  name?: string;
  redirect?: RouteRecordRedirectOption;
  component?: Component | (() => Promise<Component>);
  components?: Record<string, Component>;
  children?: AppRouteRecordRaw[];
  props?: boolean | Record<string, unknown>;
  hideMenu?: boolean;
  alwayShow?: boolean; // 只有一个子菜单时是否仍展示为父级菜单
  meta: RouteMeta;
}
