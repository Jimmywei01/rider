<template>
  <div class='container'>
    <PanelGroup/>
    <BarChart/>
  </div>
</template>

<script>
import PanelGroup from '@/components/Chart/PanelGroup'
import BarChart from './components/BarChart'
export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    BarChart
  }
}
</script>

<style lang="scss">
  .container {
    max-width: 1350px;
  }

</style>
