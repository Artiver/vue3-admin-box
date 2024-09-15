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
        removeTabInfo(tabIndex) {
            this.tabInfo.splice(tabIndex, 1);
        }
    },
    persist: {
        storage: localStorage,
    }
})