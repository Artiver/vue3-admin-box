import axios from "axios";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user.js";

const baseURL = import.meta.env.VITE_BASE_URL

const service = axios.create({
    baseURL: baseURL,
    timeout: 5000
})

// 请求前的统一处理
service.interceptors.request.use(
    (config) => {
        const user = useUserStore()
        config.headers["token"] = user.token
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        const res = response.data
        if (res.code === 200) {
            return res
        } else {
            showError(res)
            return Promise.reject(res)
        }
    },
    (error) => {
        const badMessage = error.message || error
        const code = parseInt(badMessage.toString().replace("Error: Request failed with status code ", ""))
        showError({code, message: badMessage})
        return Promise.reject(error)
    }
)

// 错误处理
function showError(error) {
    // token过期，清除本地数据，并跳转至登录页面
    if (error.code === 403) {
        const user = useUserStore()
        user.logOut()
    } else {
        ElMessage({
            message: error.msg || error.message || "服务异常",
            type: "error",
            duration: 3 * 1000
        })
    }
}

export default service