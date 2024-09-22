import {defineStore} from "pinia";

export const useTabStore = defineStore("tabs", {
    state: () => ({
        tabInfo: []
    }),
    getters: {},
    actions: {
        addTabInfo(tab) {
            this.tabInfo.push(tab);
        },
        hasTabInfo(path) {
            return this.tabInfo.some((obj) => obj.path === path);
        },
        removeTabInfo(path) {
            const tabIndex = this.tabInfo.findIndex((obj) => obj.path === path);
            if (tabIndex > -1) {
                this.tabInfo.splice(tabIndex, 1);
            }
        }
    },
    persist: {
        storage: localStorage,
    }
})