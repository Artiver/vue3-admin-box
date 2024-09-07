<template>
  <div class="card-list">
    <Row v-for="row in list" :key="row.id" :row="row"/>
  </div>
</template>

<script setup lang="js">
import Row from "./row.vue";

const list = [
  {id: 1, name: "访问人数", data: "100000", color: "#4e73df", icon: "Avatar"},
  {id: 2, name: "最新信息", data: "30", color: "#1cc88a", icon: "ChatLineSquare"},
  {id: 3, name: "库存数量", data: "20000", color: "#36b9cc", icon: "Box"},
  {id: 4, name: "当月营收", data: "20,000", color: "#f6c23e", icon: "Money"}
];
</script>

<style scoped lang="scss">
.card-list {
  width: calc(100% + 20px);
  margin-left: -10px;
  display: flex;
  flex-wrap: wrap;
}
</style>