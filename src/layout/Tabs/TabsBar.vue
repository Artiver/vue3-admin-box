<template>
  <div class="tabs">
    <el-scrollbar
        class="scroll-container tags-view-container"
        ref="scrollbarDom"
    >
      <Item
          v-for="menu in tabInfo"
          :key="menu.meta.title"
          :menu="menu"
          :active="activeMenu.path === menu.path"
          @close="delMenu(menu)"
          @reload="pageReload"
      />
    </el-scrollbar>
    <div class="handle">
      <el-dropdown placement="bottom">
        <div class="el-dropdown-link">
          <el-icon>
            <ArrowDown/>
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="tab-dropdown-item" :icon="Refresh" @click="pageReload">重新加载
            </el-dropdown-item>
            <el-dropdown-item class="tab-dropdown-item" :icon="CircleClose" :disabled="tabInfo.length < 3"
                              @click="closeOtherRoute">关闭其他标签
            </el-dropdown-item>
            <el-dropdown-item class="tab-dropdown-item" :icon="CircleClose" :disabled="tabInfo.length <= 1"
                              @click="closeAllRoute">关闭所有标签
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="js">
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {ArrowDown, CircleClose, Refresh} from "@element-plus/icons-vue";
import Item from "./item.vue";
import {useKeepAliveStore} from "@/stores/keepAlive.js";
import {useTabStore} from "@/stores/tab.js";

const tabStore = useTabStore();
const keepAliveStore = useKeepAliveStore();
const route = useRoute();
const router = useRouter();

const scrollbarDom = ref(null);
const defaultMenu = {
  path: "/dashboard",
  meta: {title: "首页", hideClose: true}
};

let activeMenu = reactive({path: ""});
const {tabInfo} = storeToRefs(tabStore);
if (tabInfo.value.length === 0) {
  addMenu(defaultMenu);
}

router.afterEach(() => {
  addMenu(route);
  initMenu(route);
});

// 当前页面组件重新加载
function pageReload() {
  const self = route.matched[route.matched.length - 1].instances.default;
  self.handleReload();
}

// 关闭一个标签页
function closeListRoute(tag) {
  if (!tag.meta.hideClose) {
    if (tag.meta.cache) {
      keepAliveStore.delKeepAliveComponentsName(tag.path);
    }
    tabStore.removeTabInfo(tag.path);
  }
}

// 关闭除了当前标签之外的所有标签
function closeOtherRoute() {
  const items = [...tabStore.tabInfo];
  for (let tag of items) {
    if (tag.path !== activeMenu.path) {
      closeListRoute(tag);
    }
  }
}

// 关闭所有的标签，除了首页
function closeAllRoute() {
  router.push(defaultMenu.path);
  const items = [...tabStore.tabInfo];
  for (let tag of items) {
    closeListRoute(tag);
  }
}

// 添加新的菜单项
function addMenu(menu) {
  let {path, meta, query} = menu;
  if (meta.hideTabs) {
    return;
  }
  if (!tabStore.hasTabInfo(path)) {
    tabStore.addTabInfo({path, meta, query});
  }
}

// 删除菜单项
function delMenu(menu, nextPath) {
  let index = tabInfo.value.findIndex((item) => item.path === menu.path);
  if (nextPath) {
    router.push(nextPath);
    return;
  }
  closeListRoute(menu);
  // 若删除的是当前页面，回到前一页，若为最后一页，则回到默认的首页
  if (menu.path === activeMenu.path) {
    const prePage = index - 1 > 0 ? tabInfo.value[index - 1] : {path: defaultMenu.path};
    router.push({path: prePage.path, query: prePage.query || {}});
  }
}

// 初始化activeMenu
function initMenu(menu) {
  activeMenu = menu;
}

// 初始化时调用：1. 新增菜单 2. 初始化activeMenu
addMenu(route);
initMenu(route);
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: var(--system-header-background);
  border-bottom: 1px solid var(--system-header-border-color);
  border-top: 1px solid var(--system-header-border-color);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .1);

  .handle {
    min-width: 50px;
    height: 100%;
    display: flex;
    align-items: center;

    .el-dropdown-link {
      margin-top: 5px;
      border-left: 1px solid var(--system-header-border-color);
      height: 25px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    i {
      color: var(--system-header-text-color);
    }
  }
}

.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar) {
    bottom: 0;
  }

  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}

.tags-view-container {
  height: 34px;
  flex: 1;
  width: 100%;
  display: flex;
}

.el-icon-full-screen {
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, .025);
  }

  &:focus {
    outline: none;
  }
}

.tab-dropdown-item {
  display: flex;
  align-items: center;
}
</style>
