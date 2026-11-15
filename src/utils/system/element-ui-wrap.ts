import {ElMessage, ElMessageBox, ElLoading, ElNotification} from "element-plus";

export default {
    // 消息提示
    msg(content: string) {
        ElMessage({
            message: content,
            type: "info",
        });
    },
    // 错误消息
    msgError(content: string) {
        ElMessage({
            message: content,
            type: "error",
        });
    },
    // 成功消息
    msgSuccess(content: string) {
        ElMessage({
            message: content,
            type: "success",
        });
    },
    // 警告消息
    msgWarning(content: string) {
        ElMessage({
            message: content,
            type: "warning",
        });
    },
    // 确认窗体
    confirm(content: string) {
        return ElMessageBox.confirm(content, "系统提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        });
    },
    // 打开遮罩层
    loading(content: string) {
        return ElLoading.service({
            lock: true,
            text: content,
            background: "rgba(0, 0, 0, 0.7)",
        });
    },
    notifySuccess(content: string) {
        ElNotification({
            title: "Success",
            message: content,
            type: "success",
        });
    },
    notifyWarning(content: string) {
        ElNotification({
            title: "Warning",
            message: content,
            type: "warning",
        });
    },
    notifyInfo(content: string) {
        ElNotification({
            title: "Info",
            message: content,
            type: "info",
        });
    },
    notifyError(content: string) {
        ElNotification({
            title: "Error",
            message: content,
            type: "error",
        });
    }
};
