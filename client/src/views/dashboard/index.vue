<template>
  <div class='dashboard_container'>
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
.dashboard_container {
    max-width: 1350px;
  }

</style>
