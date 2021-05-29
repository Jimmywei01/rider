<template>
  <div class="chartArea">
    <PanelGroup/>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="12" :lg="12">
        <OrderChart />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <PieChart />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <MotoStoreChart />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <MotoCatalogChart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from '@/components/Chart/PanelGroup'
import OrderChart from './components/OrderChart'
import PieChart from './components/PieChart'
import MotoStoreChart from './components/MotoStoreChart'
import MotoCatalogChart from './components/MotoCatalogChart'
export default {
  name: 'Analysis',
  components: {
    PanelGroup,
    OrderChart,
    PieChart,
    MotoStoreChart,
    MotoCatalogChart
  }
}
</script>

<style lang="scss">
.chartArea {
  max-width: 1350px;
}

</style>
