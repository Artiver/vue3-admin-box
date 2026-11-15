import {createRouter, createWebHashHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";
import {useUserStore} from "@/stores/user";
import {useKeepAliveStore} from "@/stores/keepAlive";
import NProgress from "@/utils/system/nprogress";
import {changeTitle} from "@/utils/system/title";
import System from "./modules/system";
import Service from "./modules/service";

NProgress.configure({showSpinner: false});

const modules = [
    ...System, ...Service
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: modules as unknown as RouteRecordRaw[]
});

// 未授权时可访问的白名单
const whiteList = ["/login"];

// 路由跳转前的监听操作
router.beforeEach((to, _from) => {
    NProgress.start();
    const user = useUserStore();
    if (to.meta.title) {
        changeTitle(to.meta.title); // 动态title
    }
    if (user.token) {
        if (to.path === "/login") {
            return "/";
        }
        return true;
    } else if (whiteList.includes(to.path)) {
        return true;
    } else {
        return "/login"; // 全部重定向到登录页
    }
});

// 路由跳转后的监听操作
router.afterEach((to, _from) => {
    const keepAliveComponents = useKeepAliveStore();
    const keepAliveComponentsName = keepAliveComponents.keepAliveComponentsName;
    const name = to.path;
    if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
        keepAliveComponents.addKeepAliveComponentsName(name);
    }
    NProgress.done();
});

export {
    modules
}

export default router
