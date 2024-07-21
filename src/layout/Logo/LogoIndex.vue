<template>
  <div class="logo-container">
    <el-space :size="10">
      <img src="@/assets/logo.png" alt="">
      <h1 v-if="!isCollapse">{{ systemTitle }}</h1>
    </el-space>
  </div>
</template>

<script setup lang="js">
import {computed} from 'vue'
import {useStore} from 'vuex'
import {systemTitle} from '@/config'

const store = useStore()
const isCollapse = computed(() => store.state.app.isCollapse)
</script>

<style scoped lang="scss">
.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--system-logo-background);

  img {
    height: 20px;
    width: 20px;
  }

  h1 {
    font-size: 18px;
    white-space: nowrap;
    color: var(--system-logo-color);
  }
}
</style>