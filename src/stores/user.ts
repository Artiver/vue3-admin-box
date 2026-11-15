import {defineStore} from "pinia";
import type {LoginParams} from "@/api/user";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: "",
    }),
    getters: {},
    actions: {
        logIn(_params: LoginParams) {
            return new Promise<boolean>((resolve) => {
                // login(params).then(res => {
                //     this.token = res.data.token
                //     resolve(true)
                // }).catch(err => {
                //     reject(err)
                // })
                this.token = "admin";
                resolve(true);
            });
        },
        logOut() {
            // logout().then(res => {
            // }).catch(error => {
            // }).finally(() => {
            //     localStorage.removeItem("user")
            //     localStorage.removeItem("tabs")
            //     localStorage.removeItem("keepAlive")
            //     location.reload()
            // })
            localStorage.removeItem("user");
            localStorage.removeItem("tabs");
            localStorage.removeItem("keepAlive");
            location.reload();
        }
    },
    persist: {
        storage: localStorage,
    }
})
