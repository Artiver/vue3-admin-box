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
  width: 100vw;
  height: 90vh;
}
</style>
