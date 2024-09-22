import {createVNode, defineComponent, h, nextTick, ref} from "vue";
import reload from "./reload.vue";
import NProgress from "@/utils/system/nprogress";

export function createNameComponent(component) {
  return () => {
    return new Promise((resolve) => {
      component().then((comm) => {
        const tempComm = defineComponent({
          name: (comm.default.name || "vuePage") + "_" + Date.now(),
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
