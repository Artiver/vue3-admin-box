<template>
  <el-config-provider :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="js">
import {computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
const size = computed(() => store.state.app.elementSize)
</script>

<style lang="scss">
.app-container {
  width: 100%;
  height: 100%;
}
</style>
