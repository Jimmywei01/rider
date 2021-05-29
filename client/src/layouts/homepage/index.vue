<template>
  <div class="app-layout">
    <AppNavbar/>
    <AppMain/>
    <AppFooter/>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'

export default {
  name: 'LayoutHomePage',
  components: {
    AppMain,
    AppNavbar,
    AppFooter
  }
}
</script>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
}

</style>
