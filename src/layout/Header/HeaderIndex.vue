<template>
  <header>
    <div class="left-box">
      <!-- 收缩按钮 -->
      <div class="menu-icon" @click="appStore.isCollapseChange(!appStore.isCollapse)">
        <el-icon v-if="appStore.isCollapse">
          <Expand/>
        </el-icon>
        <el-icon v-else>
          <Fold/>
        </el-icon>
      </div>
      <Breadcrumb v-if="appStore.other.showBreadCrumb"/>
    </div>
    <div class="right-box">
      <!-- 快捷功能按钮 -->
      <div class="function-list">
        <div class="function-list-item hidden-sm-and-down">
          <Theme/>
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            管理员
            <el-icon><ArrowDown/></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userStore.logOut()">
                <el-space size="small">
                  <el-icon>
                    <CircleCloseFilled/>
                  </el-icon>
                  <span>退出登录</span>
                </el-space>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="js">
import Breadcrumb from './Breadcrumb.vue'
import Theme from './functionList/themeIndex.vue'
import {ArrowDown, CircleCloseFilled, Expand, Fold} from "@element-plus/icons-vue"
import {useAppStore} from "@/stores/app.js"
import {useUserStore} from "@/stores/user.js"

const userStore = useUserStore()
const appStore = useAppStore()
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--system-header-background);
  padding-right: 22px;
}

.left-box {
  height: 100%;
  display: flex;
  align-items: center;

  .menu-icon {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 100;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background-color: var(--system-header-item-hover-color);
    }

    i {
      color: var(--system-header-text-color);
    }
  }
}

.right-box {
  display: flex;
  justify-content: center;
  align-items: center;

  .function-list {
    display: flex;

    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }

  .user-info {
    margin-left: 20px;

    .el-dropdown-link {
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}

.head-fold {
  font-size: 20px;
}
</style>