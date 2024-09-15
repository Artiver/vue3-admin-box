import {createRouter, createWebHashHistory} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {useKeepAliveStore} from "@/stores/keepAlive.js";
import NProgress from "@/utils/system/nprogress";
import {changeTitle} from "@/utils/system/title";
import System from "./modules/system";
import Service from "./modules/service";

NProgress.configure({showSpinner: false});

let modules = [
    ...System, ...Service
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: modules
});

// 未授权时可访问的白名单
const whiteList = ["/login"];

// 路由跳转前的监听操作
router.beforeEach((to, _from, next) => {
    NProgress.start();
    const user = useUserStore();
    if (user.token) {
        to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
        if (to.path === "/login") {
            next("/");
            return;
        }
        next()
    } else if (whiteList.includes(to.path)) {
        to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
        next();
    } else {
        next("/login"); // 全部重定向到登录页
        to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
    }
});

// 路由跳转后的监听操作
router.afterEach((to, _from) => {
    const keepAliveComponents = useKeepAliveStore();
    const keepAliveComponentsName = keepAliveComponents.keepAliveComponentsName || [];
    const name = to.matched[to.matched.length - 1].components.default.name;
    if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
        keepAliveComponents.addKeepAliveComponentsName(name);
    }
    NProgress.done();
});

export {
    modules
}

export default router
