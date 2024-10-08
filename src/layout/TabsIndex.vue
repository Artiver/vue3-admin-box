<template>
  <el-container style="height: 100vh">
    <div class="mask" v-show="!appStore.isCollapse" @click="hideMenu"></div>
    <el-aside :width="appStore.isCollapse ? '60px' : '250px'" :class="appStore.isCollapse ? 'hide-aside' : 'show-side'">
      <LogoIndex v-if="appStore.other.showLogo"/>
      <MenuIndex/>
    </el-aside>
    <el-container>
      <el-header>
        <HeaderIndex/>
      </el-header>
      <TabsBar v-show="appStore.other.showTabs"/>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade-transform'" mode="out-in">
            <keep-alive v-if="keepAliveStore.keepAliveComponentsName" :include="keepAliveStore.keepAliveComponentsName">
              <component :is="componentWrap(Component, route.fullPath)" :key="route.fullPath"/>
            </keep-alive>
            <component v-else :is="componentWrap(Component, route.fullPath)" :key="route.fullPath"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="js">
import {defineComponent, h, onBeforeMount} from "vue";
import {useEventListener} from "@vueuse/core";
import MenuIndex from "./Menu/MenuIndex.vue";
import LogoIndex from "./Logo/LogoIndex.vue";
import HeaderIndex from "./Header/HeaderIndex.vue";
import TabsBar from "./Tabs/TabsBar.vue";
import {useAppStore} from "@/stores/app.js";
import {useKeepAliveStore} from "@/stores/keepAlive.js";

const appStore = useAppStore();
const keepAliveStore = useKeepAliveStore();
const pages = new Map();
function hideMenu() {
  appStore.isCollapseChange(true);
}

function resizeHandler() {
  if (document.body.clientWidth <= 1000 && !appStore.isCollapse) {
    appStore.isCollapseChange(true);
  } else if (document.body.clientWidth > 1000 && appStore.isCollapse) {
    appStore.isCollapseChange(false);
  }
}

function componentWrap(component, key) {
  if (!component) {
    return component;
  }
  const componentName = component.type.name;
  if (pages.has(key)) {
    return pages.get(key);
  }
  if (key !== componentName) {
    // 将组件名称改为fullPath，确保同组件能够渲染不同的标签页，缓存不受影响
    const com = h(defineComponent({
      name: key,
      render() {
        return h(component)
      }
    }));
    pages.set(key, com);
    return com;
  }
  return component;
}

resizeHandler();

// 监听页面变化
onBeforeMount(() => {
  useEventListener("resize", resizeHandler);
});
</script>

<style scoped lang="scss">
.el-header {
  padding-left: 0;
  padding-right: 0;
}

.el-aside {
  display: flex;
  flex-direction: column;
  transition: 0.2s;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.el-main {
  background-color: var(--system-container-background);
  height: 100%;
  padding: 0;
  overflow-x: hidden;
}

:deep(.el-main-box) {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

@media screen and (max-width: 1000px) {
  .el-aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;

    &.hide-aside {
      left: -250px;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>