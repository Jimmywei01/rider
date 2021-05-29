<template>
  <div class="pie_container">
    <div ref="main" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  data () {
    return {
      chart: null,
      counts: {},
      option: {
        title: {
          text: '區域訂單',
          top: 5,
          left: 0,
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {},
        // legend: {
        //   orient: 'vertical',
        //   right: 0,
        //   top: 20,
        //   bottom: 20
        // },
        series: [
          {
            name: '店家訂單數量',
            type: 'pie',
            radius: ['40%', '70%'],
            // roseType: 'radius',
            data: []
          }
        ]
      }
    }
  },
  created () {
    if (this.chart !== null && this.chart !== '' && this.chart !== undefined) {
      this.chart.dispose()
      this.chart = null
    }
  },
  mounted () {
    this.getChartData()
  },
  /**
    @desc 計算每個區域店家的定單數量
    @method
      getChartData   取出每個店家 & 數量
      initChar       開始畫圖
  */
  methods: {
    async getChartData () {
      const store = await this.$store.getters.stores
      store.forEach((item, index, ary) => {
        /*
          把 storeName: "基隆區" storeOrder: 15 組合
          data:[{value: storeOrder, name: storeName}],
        */
        this.option.series[0].data.push({ value: ary[index].storeOrder, name: ary[index].storeName })
      })
      this.initChar()
    },
    initChar () {
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
.pie_container {
    width: 100%;
    height:60vh;
    background-color: white;
    margin-bottom: 25px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px #cccc;
  }

.chart {
  margin: auto;
  height:60vh;
  width: calc(90% - 6rem);
}
</style>
