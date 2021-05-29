<template>
  <el-main class="app-main">
    <keep-alive include ='Moto'>
      <router-view/>
    </keep-alive>
  </el-main>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main {
  padding: 0 0 20px 0;
  margin: 0;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
