<template>
  <el-config-provider :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="js">
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()
const size = computed(() => store.state.app.elementSize)

</script>

<style scoped lang="scss">

</style>
