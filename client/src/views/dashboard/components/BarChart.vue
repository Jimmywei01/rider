<template>
  <div class="bar_container">
    <div ref="main" class="bar" style="height: 60vh;"></div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  data () {
    return {
      chart: null,
      barData: [],
      option: {
        legend: {
          data: ['數量']
        },
        xAxis: {
          data: ['會員', '車款', '訂單', '商店']
        },
        yAxis: {},
        series: [
          {
            name: '數量',
            type: 'bar',
            barMaxWidth: '20%',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.getChartData()
  },
  /**
    @method
      getChartData  得到 char 資料
      initChar      初始化 char
  */
  methods: {
    async getChartData () {
      const member = await this.$store.getters.members
      const moto = await this.$store.getters.motos
      const order = await this.$store.getters.orders
      const store = await this.$store.getters.stores

      this.barData.push(member.length, moto.length, order.length, store.length)
      await this.barData.forEach(item => {
        this.option.series[0].data.push(item)
      })
      this.initChar()
    },
    initChar () {
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
  position: relative;
  background-color: white;
  margin-bottom: 25px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 10px #cccc;
}

.bar {
  /* 限制寬度盡量不跑版 */
  margin: auto;
  width: calc(80% - 6rem);
}

</style>
