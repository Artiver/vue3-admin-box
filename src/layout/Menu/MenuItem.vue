<template>
  <template v-if="!menu.hideMenu">
    <el-sub-menu v-if="showMenuType === 2" :index="pathResolve" :show-timeout="0" :hide-timeout="0">
      <template #title>
        <el-icon v-if="menu.meta.icon">
          <component :is="menu.meta.icon"/>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item v-for="(item, key) in menu.children" :key="key" :menu="item" :basePath="pathResolve"/>
    </el-sub-menu>
    <appLink v-else-if="showMenuType === 1" :to="pathResolve">
      <el-menu-item :index="pathResolve" v-if="!menu.children[0].children || menu.children[0].children.length === 0">
        <el-icon v-if="menu.children[0].meta.icon || menu.meta.icon">
          <component :is="menu.children[0].meta.icon || menu.meta.icon"/>
        </el-icon>
        <template #title>{{ menu.children[0].meta.title }}</template>
      </el-menu-item>
      <el-sub-menu v-else :index="pathResolve" :show-timeout="0" :hide-timeout="0">
        <template #title>
          <el-icon v-if="menu.children[0].meta.icon || menu.meta.icon">
            <component :is="menu.children[0].meta.icon || menu.meta.icon"/>
          </el-icon>
          <span>{{ menu.children[0].meta.title }}</span>
        </template>
        <menu-item v-for="(item, key) in menu.children[0].children" :key="key" :menu="item" :basePath="pathResolve"/>
      </el-sub-menu>
    </appLink>
    <appLink v-else :to="pathResolve">
      <el-menu-item :index="pathResolve">
        <el-icon v-if="menu.meta.icon">
          <component :is="menu.meta.icon"/>
        </el-icon>
        <template #title>{{ menu.meta.title }}</template>
      </el-menu-item>
    </appLink>
  </template>
</template>

<script setup lang="js">
import {computed} from "vue";
import appLink from "./Link.vue";

const props = defineProps({
  menu: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ""
  }
});

const menu = props.menu;
// todo: 优化if结构
const showMenuType = computed(() => { // 0: 无子菜单， 1：有1个子菜单， 2：显示上下级子菜单
  if (menu.children && (menu.children.length > 1 || (menu.children.length === 1 && menu.alwayShow))) {
    return 2;
  } else if (menu.children && menu.children.length === 1 && !menu.alwayShow) {
    return 1;
  } else {
    return 0;
  }
});
// todo: 优化多层if
const pathResolve = computed(() => {
  let path;
  if (showMenuType.value === 1) {
    if (menu.children[0].path.charAt(0) === "/") {
      path = menu.children[0].path;
    } else {
      let char = "/";
      if (menu.path.charAt(menu.path.length - 1) === "/") {
        char = "";
      }
      path = menu.path + char + menu.children[0].path;
    }
  } else {
    path = menu.path;
  }
  path = props.basePath ? props.basePath + "/" + path : path;
  return path;
});
</script>

<style scoped lang="scss">
.el-sub-menu {
  text-align: left;
}

.el-menu-item {
  text-align: left;
}

.el-menu-item i, .el-sub-menu__title i {
  padding-right: 8px;
}
</style>