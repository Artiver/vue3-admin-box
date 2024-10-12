import {defineStore} from "pinia";

export const useIframeStore = defineStore("iframe", {
    state: () => ({
        iframePages: {}
    }),
    getters: {},
    actions: {
        getIframePages(key) {
            return this.iframePages[key];
        },
        setIframePages(key, value) {
            this.iframePages[key] = value;
        },
    }
})