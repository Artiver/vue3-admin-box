import {defineStore} from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        isCollapse: false, // 侧边栏是否收缩展示
        elementSize: "small", // element默认尺寸，支持官网large / default / small小参数
        theme: {
            state: {
                style: "chinese",
                primaryColor: "#e69966",
                primaryTextColor: "#000000",
                menuType: "side"
            }
        },
        other: {
            showLogo: true, // 是否显示Logo
            showTabs: true, // 是否显示标签页
            showBreadCrumb: true, // 是否显示面包屑
            expandOneMenu: true, // 一次是否只能展开一个菜单
        }
    }),
    getters: {},
    actions: {
        isCollapseChange(option) {
            this.isCollapse = option;
        },
        setState(option) {
            this.other[option.store] = option.value;
        },
        setTheme(option) {
            this.theme = option;
        },
    },
    persist: {
        storage: localStorage,
    }
})