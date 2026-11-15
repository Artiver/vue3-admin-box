<template>
  <component :is="type" v-bind="linkProps(props.to)" @click="hideMenu">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useAppStore} from "@/stores/app";

const type = ref("router-link");
const props = defineProps({
  to: {
    type: String,
    required: true
  }
});
const appStore = useAppStore();
const linkProps = (to: string) => {
  return {
    to: to
  };
};
const hideMenu = () => {
  if (document.body.clientWidth <= 1000 && !appStore.isCollapse) {
    appStore.isCollapseChange(true);
  }
};
</script>
<style scoped lang="scss">

</style>