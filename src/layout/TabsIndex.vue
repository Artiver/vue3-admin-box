<template>
  <el-container style="height: 100vh">
    <div
        class="mask"
        v-show="!isCollapse && !contentFullScreen"
        @click="hideMenu"
    ></div>
    <el-aside
        :width="isCollapse ? '60px' : '250px'"
        :class="isCollapse ? 'hide-aside' : 'show-side'"
        v-show="!contentFullScreen"
    >
      <LogoIndex v-if="showLogo"/>
      <MenuIndex/>
    </el-aside>
    <el-container>
      <el-header v-show="!contentFullScreen">
        <HeaderIndex/>
      </el-header>
      <TabsBar v-show="showTabs"/>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition
              :name="route.meta.transition || 'fade-transform'"
              mode="out-in"
          >
            <keep-alive
                v-if="keepAliveComponentsName"
                :include="keepAliveComponentsName"
            >
              <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="js">
import {computed, onBeforeMount} from "vue"
import {useStore} from "vuex"
import {useEventListener} from "@vueuse/core"
import MenuIndex from "./Menu/MenuIndex.vue"
import LogoIndex from "./Logo/LogoIndex.vue"
import HeaderIndex from "./Header/HeaderIndex.vue"
import TabsBar from "./Tabs/TabsBar.vue"

const store = useStore()

const isCollapse = computed(() => store.state.app.isCollapse)
const contentFullScreen = computed(() => store.state.app.contentFullScreen)
const showLogo = computed(() => store.state.app.showLogo)
const showTabs = computed(() => store.state.app.showTabs)
const keepAliveComponentsName = computed(() => store.getters['keepAlive/keepAliveComponentsName'])

function hideMenu() {
  store.commit("app/isCollapseChange", true)
}

function resizeHandler() {
  if (document.body.clientWidth <= 1000 && !isCollapse.value) {
    store.commit("app/isCollapseChange", true)
  } else if (document.body.clientWidth > 1000 && isCollapse.value) {
    store.commit("app/isCollapseChange", false)
  }
}

resizeHandler()

// 监听页面变化
onBeforeMount(() => {
  useEventListener("resize", resizeHandler)
})
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