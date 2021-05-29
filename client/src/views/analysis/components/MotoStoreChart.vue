<template>
  <div class="bar_container">
    <div ref="main" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  data () {
    return {
      chart: null,
      barData: [],
      counts: {},
      moto: [],
      option: {
        title: {
          left: 'center'
        },
        color: ['#FFBF00'],
        tooltip: {},
        legend: {
          data: ['車款數量']
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          data: []
        },
        series: [
          {
            name: '車款數量',
            type: 'bar',
            stack: 'total',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.getCharName()
    this.getChartData()
  },
  /**
  @method
    getCharName      Y軸名字
    getChartData     資料 -> 資料順序 node.js reverse
    initChar         初始化重新撈資料
  */
  methods: {
    // Y 軸
    getCharName () {
      const seletCC = this.$store.getters.seletCC
      // 純用 sort 排序會問題，所以用 a,b 比大小排序
      seletCC.sort((a, b) => {
        return a - b
      })
      const cc = []
      for (let i = 0; i < seletCC.length; i++) {
        cc.push(String(seletCC[i]).concat('cc'))
      }
      this.option.yAxis.data = cc
    },
    /*
      用 store 篩選出不同 cc 數的數量
      計算不同 moto 的 cc 數的數量
      相同的 cc 數爲一個 array
    */
    async getChartData () {
      const moto = await this.$store.getters.motos
      moto.forEach((item, index, ary) => {
        // cc要同步yAixs的資料
        const ccNum = Number(item.cc)
        this.counts[ccNum] = this.counts[ccNum] ? this.counts[ccNum] + 1 : 1
      })
      this.option.series[0].data = Object.values(this.counts)
      this.initChar()
    },
    initChar () {
      if (this.chart !== null && this.chart !== '' && this.chart !== undefined) {
        this.chart.dispose()
        this.chart = null
      }
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
