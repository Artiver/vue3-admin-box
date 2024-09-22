<template>
  <el-col>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button link type="primary" @click="handleClick(scope.row.id)">Detail</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router';

const router = useRouter();

const tableData = [
  {
    id: 1,
    name: 'Tom',
  },
  {
    id: 2,
    name: 'Jerry',
  }
]

function handleClick(id) {
  router.push("/article/detail/" + id);
}
</script>

<style scoped lang="scss">

</style>