import {defineStore} from "pinia";
import type {ThemeStyleName} from "@/theme/index";

/**
 * element-plus 支持的整体尺寸
 */
export type ElementSize = "large" | "default" | "small";

export interface AppThemeState {
    style: ThemeStyleName;
    primaryColor: string;
    primaryTextColor: string;
    menuType: string;
}

export interface AppTheme {
    state: AppThemeState;
}

export interface AppOtherOptions {
    showLogo: boolean; // 是否显示Logo
    showTabs: boolean; // 是否显示标签页
    showBreadCrumb: boolean; // 是否显示面包屑
    expandOneMenu: boolean; // 一次是否只能展开一个菜单
}

export const useAppStore = defineStore("app", {
    state: () => ({
        isCollapse: false, // 侧边栏是否收缩展示
        elementSize: "small" as ElementSize, // element默认尺寸，支持官网large / default / small小参数
        theme: {
            state: {
                style: "chinese",
                primaryColor: "#e69966",
                primaryTextColor: "#000000",
                menuType: "side"
            }
        } as AppTheme,
        other: {
            showLogo: true,
            showTabs: true,
            showBreadCrumb: true,
            expandOneMenu: true,
        } as AppOtherOptions
    }),
    getters: {},
    actions: {
        isCollapseChange(option: boolean) {
            this.isCollapse = option;
        },
        setState(option: { store: keyof AppOtherOptions; value: boolean }) {
            this.other[option.store] = option.value;
        },
        setTheme(option: AppTheme) {
            this.theme = option;
        },
    },
    persist: {
        storage: localStorage,
    }
})
