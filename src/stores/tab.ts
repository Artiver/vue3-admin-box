import {defineStore} from "pinia";
import type {LocationQuery, RouteMeta} from "vue-router";
import {usePagesStore} from "./pages";

/**
 * 标签页需要的最小路由信息
 */
export interface TabInfo {
    path: string;
    meta: RouteMeta;
    query?: LocationQuery;
}

export const useTabStore = defineStore("tabs", {
    state: () => ({
        tabInfo: [] as TabInfo[]
    }),
    getters: {},
    actions: {
        addTabInfo(tab: TabInfo) {
            this.tabInfo.push(tab);
        },
        hasTabInfo(path: string) {
            return this.tabInfo.some((obj) => obj.path === path);
        },
        removeTabInfo(path: string) {
            const tabIndex = this.tabInfo.findIndex((obj) => obj.path === path);
            if (tabIndex > -1) {
                this.tabInfo.splice(tabIndex, 1);
                const pagesStore = usePagesStore();
                pagesStore.delIframePages(path);
            }
        }
    },
    persist: {
        storage: localStorage,
    }
})
