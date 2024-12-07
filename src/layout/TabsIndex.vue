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
        <component
            v-for="(value, key) in iframePages"
            :is="value"
            v-show="isIframe && key === route.path"
            :key="key"
        />
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive v-if="keepAliveStore.keepAliveComponentsName" :include="keepAliveStore.keepAliveComponentsName">
              <component v-if="!isIframe" :is="componentWrap(Component, route.path)" :key="route.path"/>
            </keep-alive>
            <component v-else-if="!isIframe" :is="componentWrap(Component, route.path)" :key="route.path"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="js">
import {defineComponent, h, ref, watch, onBeforeMount} from "vue";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useEventListener} from "@vueuse/core";
import MenuIndex from "./Menu/MenuIndex.vue";
import LogoIndex from "./Logo/LogoIndex.vue";
import HeaderIndex from "./Header/HeaderIndex.vue";
import TabsBar from "./Tabs/TabsBar.vue";
import {useAppStore} from "@/stores/app.js";
import {useKeepAliveStore} from "@/stores/keepAlive.js";
import {usePagesStore} from "@/stores/pages.js";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const keepAliveStore = useKeepAliveStore();
const pagesStore = usePagesStore();

const isIframe = ref(false);
const {iframePages} = storeToRefs(pagesStore);

function hideMenu() {
  appStore.isCollapseChange(true);
}

watch(
  () => route.meta.iframe,
  (newValue) => {
    isIframe.value = newValue;
    if (isIframe.value) {
      iframeWrap(route.path);
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

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
  const pages = pagesStore.getKeepAlivePages(key);
  if (pages) {
    return pages;
  }
  if (key !== componentName) {
    // 将组件名称改为path，确保同组件能够渲染不同的标签页，缓存不受影响
    const wrapper = h(defineComponent({
      name: key,
      render() {
        return h(component)
      }
    }));
    pagesStore.setKeepAlivePages(key, wrapper);
    return wrapper;
  }
  return component;
}

function iframeWrap(key) {
  if (pagesStore.getIframePages(key)) {
    return;
  }
  // 路由是懒加载的，需要通过resolve渲染取得
  const tempMatched = router.resolve({path: key}).matched;
  const component = tempMatched[tempMatched.length - 1].components.default;
  const wrapper = h(defineComponent({
    name: key,
    render() {
      return h(component);
    },
  }));
  pagesStore.setIframePages(key, wrapper);
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