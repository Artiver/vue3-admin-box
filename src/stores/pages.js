import {defineStore} from "pinia";

export const usePagesStore = defineStore("pages", {
    state: () => ({
        iframePages: {},
        keepAlivePages: {}
    }),
    getters: {},
    actions: {
        getIframePages(key) {
            return this.iframePages[key];
        },
        setIframePages(key, value) {
            this.iframePages[key] = value;
        },
        getKeepAlivePages(key) {
            return this.keepAlivePages[key];
        },
        setKeepAlivePages(key, value) {
            this.keepAlivePages[key] = value;
        }
    }
})