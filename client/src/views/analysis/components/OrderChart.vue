<template>
  <div class="line_container">
    <div ref="main" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'OrderChart',
  data () {
    return {
      member: '',
      moto: '',
      order: '',
      chart: null,
      barData: [],
      counts: {
        1: null || 0,
        2: null || 0,
        3: null || 0,
        4: null || 0,
        5: null || 0,
        6: null || 0,
        7: null || 0,
        8: null || 0,
        9: null || 0,
        10: null || 0,
        11: null || 0,
        12: null || 0
      },
      option: {
        title: {
          left: 'center'
        },
        tooltip: {},
        legend: {
          data: ['月訂單數量']
        },
        xAxis: {
          data: ['1month', '2month', '3month', '4month', '5month', '6month', '7month', '8month', '9month', '10month', '11month', '12month']
        },
        yAxis: {},
        series: [
          {
            name: '月訂單數量',
            type: 'line',
            barMaxWidth: '20%',
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
    @desc 計算每月訂單數量
    @method
      getChartData   取出每個日期
      filterDate     篩選出月份進行統計
      initChar       開始畫圖
  */
  methods: {
    async getChartData () {
      const order = await this.$store.getters.orders
      const ary = []
      order.forEach(item => {
        ary.push(item.orderDate)
      })
      this.filterDate(ary)
    },
    /*
      用 slice 把月份取出，轉為 new array
      比對相同的月份有幾個，再給 object
      塞給 data 顯示
    */
    filterDate (ary) {
      const month = []
      ary.forEach(item => {
        month.push(item.slice(5, 7))
      })
      for (let i = 0; i < month.length; i++) {
        // 將 month[i] 值存於num中
        const num = Number(month[i])
        // 比較counts物件，如相同則該物件存值+1，如不同則存值設為1
        this.counts[num] = this.counts[num] ? this.counts[num] + 1 : 1
      }
      this.option.series[0].data.push(this.counts[1], this.counts[2], this.counts[3], this.counts[4], this.counts[5], this.counts[6], this.counts[7], this.counts[8], this.counts[9], this.counts[10], this.counts[11], this.counts[12])
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
.line_container {
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
