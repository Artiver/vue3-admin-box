import {defineStore} from "pinia";

export const useKeepAliveStore = defineStore("keepAlive", {
    state: () => ({
        keepAliveComponentsName: [] as string[]
    }),
    getters: {},
    actions: {
        addKeepAliveComponentsName(name: string) {
            this.keepAliveComponentsName.push(name);
        },
        delKeepAliveComponentsName(name: string) {
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
