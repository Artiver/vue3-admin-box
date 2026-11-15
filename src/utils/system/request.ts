import axios from "axios";
import type {AxiosRequestConfig, AxiosResponse} from "axios";
import {useUserStore} from "@/stores/user";
import elMessage from "@/utils/system/element-ui-wrap";

const baseURL = import.meta.env.VITE_BASE_URL;

/**
 * 后端统一返回结构
 */
export interface ApiResult<T = unknown> {
    code: number;
    msg?: string;
    message?: string;
    data: T;
}

const service = axios.create({
    baseURL: baseURL,
    timeout: 5000
});

// 请求前的统一处理
service.interceptors.request.use(
    (config) => {
        const user = useUserStore()
        config.headers["Authorization"] = "Bearer " + user.token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        const res = response.data as ApiResult;
        if (res.code === 200) {
            // 拦截器直接返回业务数据，故此处需要绕过 axios 的响应类型
            return res as unknown as AxiosResponse;
        } else {
            showError(res);
            return Promise.reject(res);
        }
    },
    (error) => {
        const badMessage = error.message || error;
        const code = parseInt(badMessage.toString().replace("Error: Request failed with status code ", ""));
        showError({code, message: badMessage});
        return Promise.reject(error);
    }
)

// 错误处理
function showError(error: { code?: number; msg?: string; message?: string }) {
    // token过期，清除本地数据，并跳转至登录页面
    if (error.code === 403) {
        const user = useUserStore();
        user.logOut();
    } else {
        elMessage.msgError(error.msg || error.message || "服务异常");
    }
}

/**
 * 统一请求方法，返回值即为后端返回的 ApiResult
 */
export function request<T = unknown>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
    return service.request<ApiResult<T>, ApiResult<T>>(config);
}

export default request
