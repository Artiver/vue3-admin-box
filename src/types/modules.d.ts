/**
 * 缺失类型声明的第三方模块补充
 */

declare module "@wangeditor/editor-for-vue" {
  import type {DefineComponent} from "vue";

  export const Editor: DefineComponent<any, any, any>;
  export const Toolbar: DefineComponent<any, any, any>;
}
