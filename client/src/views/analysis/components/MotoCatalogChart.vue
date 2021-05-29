<template>
  <div class="bar_container">
      <FilterMoto @update:filtMotoStore='getChartData'/>
      <div ref="main" style="height:50vh;" class="chart"></div>
  </div>
</template>

<script>
import FilterMoto from './FilterMoto'
export default {
  name: 'BarChart',
  components: {
    FilterMoto
  },
  data () {
    return {
      member: '',
      moto: '',
      order: '',
      chart: null,
      barData: [],
      option: {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['機車數量']
        },
        xAxis: {
          data: [],
          // splitNumber: 10
          axisTick: {
            alignWithLabel: true,
            interval: 0
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '機車數量',
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            },
            barMaxWidth: '20%',
            data: ['0']
          }
        ]
      }
    }
  },
  methods: {
    getChartData (value) {
      if (value[0].length === value[1].length) {
        this.option.xAxis.data = value[0]
        this.option.series[0].data = value[1]
      }
      this.initChar()
    },
    initChar () {
      if (this.chart !== null && this.chart !== '' && this.chart !== undefined) {
        this.chart.dispose()
        this.chart = null
      }
      // Vue 用 $ref 取 DOM 元素，初始化 chart
      this.chart = this.$echarts.init(this.$refs.main)
      this.chart.setOption(this.option)
      window.addEventListener('resize', () => {
        this.chart.resize()
      })
    }
  }
}
</script>

<style scoped>
.bar_container {
    width: 100%;
    height: 60vh;
    background-color: white;
    margin-bottom: 25px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px #cccc;
  }

.chart {
  margin: auto;
  width: calc(90% - 6rem);
}

</style>
