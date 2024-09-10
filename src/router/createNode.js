// 1. 用于解决keep-alive需要name的问题，动态生成随机name供keep-alive使用
// 2. 用于解决transition动画内部结点只能为根元素的问题，单文件可写多结点
import {createVNode, defineComponent, h, nextTick, ref} from "vue";
import reload from "./reload.vue";
import NProgress from "@/utils/system/nprogress";

export function createNameComponent(component) {
  return () => {
    return new Promise((resolve) => {
      component().then((comm) => {
        const name = (comm.default.name || "vueAdminBox") + "_" + Date.now();
        const tempComm = defineComponent({
          name: name,
          props: comm.default.props || {},
          setup() {
            const isReload = ref(false);
            const handleReload = () => {
              isReload.value = true;
              NProgress.start();
              nextTick(() => {
                NProgress.done();
                isReload.value = false;
              });
            };
            return {
              isReload,
              handleReload
            };
          },
          render: function () {
            if (this.isReload) {
              return h("div", {class: "el-main-box"}, [h(reload)]);
            } else {
              return h("div", {class: "el-main-box"}, [createVNode(comm.default, this.$props)]);
            }
          }
        });
        resolve(tempComm);
      });
    });
  }
}
