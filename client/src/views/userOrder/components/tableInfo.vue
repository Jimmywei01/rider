<template>
  <div class="tableContainer">
      <div v-for="item in tableData"  :key="item.id">
        <table class="table" v-show="show === false">
          <tr>
            <td class="table_title">車廠</td>
            <td class="table_title">車款</td>
            <td class="table_title">取車點</td>
            <td class="table_title">還車點</td>
          </tr>
          <tr>
            <td class="table_info">{{item.MotoHouse.motoStore}}</td>
            <td class="table_info">{{item.MotoHouse.motoCatalog}}</td>
            <td class="table_info">{{item.orderLocal}}</td>
            <td class="table_info">{{item.orderLocalBack}}</td>
          </tr>
          <tr>
            <td class="table_title">取車日期</td>
            <td class="table_title">還車日期</td>
            <td class="table_title">數量</td>
            <td class="table_title">訂單日期</td>
          </tr>
          <tr>
            <td class="table_info">{{item.orderCar}}</td>
            <td class="table_info">{{item.orderCarBack}}</td>
            <td class="table_info">{{item.orderCarNumbers}}</td>
            <td class="table_info">{{item.orderDate}}</td>
          </tr>
          <tr>
            <th class="table_title" colspan="4">訂單狀態</th>
          </tr>
          <tr>
            <th class="table_info" colspan="4">{{item.orderStatus}}</th>
          </tr>
      </table>
      <table class="tableSec" v-show="show===true">
          <tr>
            <td class="table_title">車廠</td>
            <td class="table_title">車款</td>
          </tr>
          <tr>
            <td class="table_info">{{item.MotoHouse.motoStore}}</td>
            <td class="table_info">{{item.MotoHouse.motoCatalog}}</td>
          </tr>
          <tr>
            <td class="table_title">取車點</td>
            <td class="table_title">還車點</td>
          </tr>
          <tr>
            <td class="table_info">{{item.orderLocal}}</td>
            <td class="table_info">{{item.orderLocalBack}}</td>
          </tr>
          <tr>
            <td class="table_title">取車日期</td>
            <td class="table_title">還車日期</td>
          </tr>
          <tr>
            <td class="table_info">{{item.orderCar}}</td>
            <td class="table_info">{{item.orderCarBack}}</td>
          </tr>
          <tr>
            <td class="table_title">數量</td>
            <td class="table_title">訂單日期</td>
          </tr>
          <tr>
            <td class="table_info">{{item.orderCarNumbers}}</td>
            <td class="table_info">{{item.orderDate}}</td>
          </tr>
          <tr>
            <th class="table_title" colspan="2">訂單狀態</th>
          </tr>
          <tr>
            <th class="table_info" colspan="2">{{item.orderStatus}}</th>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableInfo',
  props: {
    tableData: {
      type: Array,
      deep: true
    },
    windowsWidth: {
      type: Number
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.handleResize()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy () {
    // 組件銷毀時，銷毀監聽事件
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      if (window.innerWidth < 520) {
        this.show = true
      } else {
        this.show = false
      }
    }
  }

}
</script>

<style lang='scss'  scoped>
.tableContainer {
  width:500px;
  display:flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-color: #ffffff;
  margin-top: 35px;
}

.table {
  width:500px;
  border-bottom: 1px solid black;
  text-align: center;
}
.table_title {
  box-sizing: border-box;
  position: relative;
  color: #909399;
  text-align: center;
  border-bottom: 1px solid #dfe6ec;
  font-size: 14px;
  padding: 5px 0;
}

.table_info {
  padding: 12px 0;
  font-size: 14px;
  color: #606266;
}

.tableSec {
  width:500px;
  border-bottom: 1px solid black;
  text-align: center;
}

@media screen and (max-width: 520px) {
  .tableContainer  {
    width:300px;
  }
  .tableSec {
    width:300px;
  }
}

</style>
