import {createVNode, defineComponent, h, nextTick, ref} from "vue";
import type {Component, ComponentPropsOptions} from "vue";
import reload from "./reload.vue";
import NProgress from "@/utils/system/nprogress";

/**
 * 可重新加载的页面组件实例暴露的方法
 */
export interface ReloadableComponent {
    handleReload: () => void;
}

type ComponentModule = { default: Component };
type AsyncComponentLoader = () => Promise<ComponentModule>;

export function createNameComponent(component: AsyncComponentLoader) {
    return () => {
        return new Promise<Component>((resolve) => {
            component().then((comm) => {
                const inner = comm.default as Component & {
                    name?: string;
                    props?: ComponentPropsOptions;
                };
                const tempComm = defineComponent({
                    name: (inner.name || "vuePage") + "_" + Date.now(),
                    props: inner.props || {},
                    setup(props, {expose}) {
                        const isReload = ref(false);
                        const handleReload = () => {
                            isReload.value = true;
                            NProgress.start();
                            nextTick(() => {
                                NProgress.done();
                                isReload.value = false;
                            });
                        };
                        expose({handleReload});
                        return () => h("div", {class: ""}, [
                            isReload.value ? h(reload) : createVNode(inner, props)
                        ]);
                    }
                });
                resolve(tempComm);
            });
        });
    }
}
