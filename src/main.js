import {createApp} from "vue";
import "normalize.css"; // css初始化
import "element-plus/dist/index.css"; // elementPlus css
import "./assets/style/common.scss"; // 公共css
import "./theme/modules/chinese/index.scss"; // 主题css
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css"; // 右键菜单
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);
app.use(router);
app.mount("#app");
