<template>
  <component :is="type" v-bind="linkProps(props.to)" @click="hideMenu">
    <slot></slot>
  </component>
</template>

<script setup lang="js">
import {ref} from "vue";
import {useAppStore} from "@/stores/app.js";

const type = ref("router-link");
const props = defineProps({
  to: {
    type: String,
    required: true
  }
});
const appStore = useAppStore();
const linkProps = (to) => {
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