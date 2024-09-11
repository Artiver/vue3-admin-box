import {ElMessage, ElMessageBox, ElLoading, ElNotification} from "element-plus";

export default {
    // 消息提示
    msg(content) {
        ElMessage({
            message: content,
            type: "info",
        });
    },
    // 错误消息
    msgError(content) {
        ElMessage({
            message: content,
            type: "error",
        });
    },
    // 成功消息
    msgSuccess(content) {
        ElMessage({
            message: content,
            type: "success",
        });
    },
    // 警告消息
    msgWarning(content) {
        ElMessage({
            message: content,
            type: "warning",
        });
    },
    // 确认窗体
    confirm(content) {
        return ElMessageBox.confirm(content, "系统提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        });
    },
    // 打开遮罩层
    loading(content) {
        return ElLoading.service({
            lock: true,
            text: content,
            background: "rgba(0, 0, 0, 0.7)",
        });
    },
    notifySuccess(content) {
        ElNotification({
            title: "Success",
            message: content,
            type: "success",
        });
    },
    notifyWarning(content) {
        ElNotification({
            title: "Warning",
            message: content,
            type: "warning",
        });
    },
    notifyInfo(content) {
        ElNotification({
            title: "Info",
            message: content,
            type: "info",
        });
    },
    notifyError(content) {
        ElNotification({
            title: "Error",
            message: content,
            type: "error",
        });
    }
};