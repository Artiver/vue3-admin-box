<template>
  <el-scrollbar>
    <el-menu
        class="layout-menu system-scrollbar"
        background-color="var(--system-menu-background)"
        text-color="var(--system-menu-text-color)"
        active-text-color="var(--system-primary-color)"
        :default-active="activeMenu"
        :class="appStore.isCollapse? 'collapse' : ''"
        :collapse="appStore.isCollapse"
        :collapse-transition="false"
        :unique-opened="expandOneMenu"
    >
      <menu-item v-for="(menu, key) in allRoutes" :key="key" :menu="menu"/>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="js">
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import MenuItem from "./MenuItem.vue";
import {useAppStore} from "@/stores/app.js";

const appStore = useAppStore();
const expandOneMenu = computed(() => appStore.other.expandOneMenu);
const allRoutes = useRouter().options.routes;
const route = useRoute();
const activeMenu = computed(() => {
  const {meta, path} = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<style scoped lang="scss">
.el-scrollbar {
  background-color: var(--system-menu-background);
}

.layout-menu {
  width: 100%;
  border: none;

  &.collapse {
    margin-left: 0;
  }

  :deep() {
    .el-menu-item, .el-sub-menu {
      background-color: var(--system-menu-background) !important;
    }

    .el-menu-item i, .el-menu-item-group__title, .el-sub-menu__title i {
      color: var(--system-menu-text-color);
    }

    .el-menu-item, .el-sub-menu__title {
      &.is-active {
        background-color: var(--system-primary-color) !important;
        color: var(--system-primary-text-color) !important;

        i {
          color: var(--system-primary-text-color) !important;
        }

        &:hover {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;
        }
      }

      &:hover {
        background-color: var(--system-menu-hover-background) !important;
      }
    }

    .el-sub-menu {
      &.is-active {
        > .el-sub-menu__title, > .el-sub-menu__title i {
          color: var(--system-menu-submenu-active-color) !important;
        }
      }

      .el-menu-item {
        background-color: var(--system-menu-children-background) !important;

        &.is-active {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;

          &:hover {
            background-color: var(--system-primary-color) !important;
            color: var(--system-primary-text-color) !important;
          }
        }

        &:hover {
          background-color: var(--system-menu-hover-background) !important;
        }
      }

      .el-sub-menu {
        .el-sub-menu__title {
          background-color: var(--system-menu-children-background) !important;

          &:hover {
            background-color: var(--system-menu-hover-background) !important;
          }
        }
      }
    }
  }
}
</style>