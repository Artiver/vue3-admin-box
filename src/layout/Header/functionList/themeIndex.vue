<template>
  <div title="系统设置" @click="drawerChange(true)">
    <el-icon>
      <Setting/>
    </el-icon>
  </div>
  <el-drawer
      title="系统设置"
      v-model="drawer"
      size="300px"
      :show-close="false"
      direction="rtl">
    <h3>整体风格设置</h3>
    <div class="theme-box">
      <theme-icon
          v-model:active="state.style"
          v-for="(row, index) in style"
          :key="index"
          :name="index"
          :tip="row.name"
          :logo="row.logo.background"
          :menu="row.menu.background"
          :header="row.header.background"
          :main="row.container.background"
          :activeColor="row.page.color"
      ></theme-icon>
    </div>
    <h3>主题色</h3>
    <div class="theme-box">
      <theme-color
          v-for="(item, key) in themeColorArr"
          v-model:active="state.primaryColor"
          v-model:activeTextColor="state.primaryTextColor"
          :key="key"
          :color="item.color"
          :textColor="item.textColor"
          :tip="item.tip"
      ></theme-color>
    </div>
    <h3>其他设置</h3>
    <div class="list">
      <div class="list-item" v-for="option in options" :key="option.name">
        <span>{{ option.name }}</span>
        <el-switch
            v-model="option.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(option)"
        >
        </el-switch>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="js">
import {reactive, ref, watch} from "vue";
import themeIcon from "./theme/theme-icon.vue";
import themeColor from "./theme/theme-color.vue";
import {style} from "@/theme/index";
import {Setting} from "@element-plus/icons-vue";
import {useAppStore} from "@/stores/app.js";

const appStore = useAppStore();
const state = reactive({
  style: appStore.theme.state.style,
  primaryColor: appStore.theme.state.primaryColor,
  primaryTextColor: appStore.theme.state.primaryTextColor,
  menuType: appStore.theme.state.menuType
});
const themeColorArr = [
  {color: "#409eff", textColor: "#fff", tip: "默认蓝"},
  {color: "#d60f20", textColor: "#fff", tip: "玫瑰红"},
  {color: "#ac25e6", textColor: "#fff", tip: "优雅紫"},
  {color: "#4dc86f", textColor: "#fff", tip: "故事绿"},
  {color: "#13c2c2", textColor: "#fff", tip: "明青"},
  {color: "#333", textColor: "#fff", tip: "极客黑"}
];

function setTheme() {
  const userTheme = style[state.style]
  const body = document.getElementsByTagName("body")[0]
  body.setAttribute("data-theme", state.style)
  body.style.setProperty("--system-primary-color", state.primaryColor)
  for (let i in userTheme) {
    if (i === "name") {
      continue;
    }
    const item = userTheme[i]
    for (let y in item) {
      let cssVarName = "--system-" + i + "-" + y.replace(/([A-Z])/g, "-$1").toLowerCase()
      body.style.setProperty(cssVarName, item[y])
    }
  }
  appStore.setTheme({state: {...state}})
}

watch(state, () => {
  setTheme()
});

let drawer = ref(false);
const options = reactive([
  {name: "显示Logo", value: appStore.other.showLogo, store: "showLogo"},
  {name: "显示面包屑导航", value: appStore.other.showBreadCrumb, store: "showBreadCrumb"},
  {name: "显示标签页导航", value: appStore.other.showTabs, store: "showTabs"},
  {name: "保持一个菜单展开", value: appStore.other.expandOneMenu, store: "expandOneMenu"}
]);

function drawerChange(value) {
  drawer.value = value;
}

function change(option) {
  appStore.setState({store: option.store, value: option.value});
}

setTheme();
</script>

<style scoped lang="scss">
i {
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

.list {
  padding: 0 20px;

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    span {
      font-size: 16px;
    }
  }
}

h3 {
  margin-top: 40px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, .85);
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  padding: 0 20px;

  &:first-child {
    margin-top: 0;
  }
}

.theme-box {
  text-align: left;
  padding-left: 20px;
}
</style>