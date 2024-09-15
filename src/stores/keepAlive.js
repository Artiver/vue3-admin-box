import {defineStore} from "pinia";

export const useKeepAliveStore = defineStore("keepAlive", {
    state: () => ({
        keepAliveComponentsName: []
    }),
    getters: {},
    actions: {
        addKeepAliveComponentsName(name) {
            this.keepAliveComponentsName.push(name);
        },
        delKeepAliveComponentsName(name) {
            const key = this.keepAliveComponentsName.indexOf(name);
            if (key !== -1) {
                this.keepAliveComponentsName.splice(key, 1);
            }
        }
    },
    persist: {
        storage: localStorage,
    }
})