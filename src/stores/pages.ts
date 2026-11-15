import {defineStore} from "pinia";
import type {VNode} from "vue";

export const usePagesStore = defineStore("pages", {
    state: () => ({
        iframePages: {} as Record<string, VNode>,
        keepAlivePages: {} as Record<string, VNode>
    }),
    getters: {},
    actions: {
        getIframePages(key: string) {
            return this.iframePages[key];
        },
        setIframePages(key: string, value: VNode) {
            this.iframePages[key] = value;
        },
        delIframePages(key: string) {
            delete this.iframePages[key];
        },
        getKeepAlivePages(key: string) {
            return this.keepAlivePages[key];
        },
        setKeepAlivePages(key: string, value: VNode) {
            this.keepAlivePages[key] = value;
        }
    }
})
