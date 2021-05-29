<template>
  <div class="container">
    <HomeSide class="side"/>
    <section>
      <div class="order-table" v-show="show===false">
        <div class="order-container">

          <el-table
            type="flex"
            justify="center"
            align="middle"
            :data="tableData"
            max-height="800"
            >

            <el-table-column
              label="車廠"
              align='center'
              width="100">
              <template slot-scope="{row}">
                  <p>{{ row.MotoHouse.motoStore}}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="車款"
              align='center'
              width="120">
              <template slot-scope="{row}">
                  <p>{{ row.MotoHouse.motoCatalog }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="數量"
              align='center'
              width="50">
              <template slot-scope="{row}">
                  <p>{{ row.orderCarNumbers }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="取車點"
              align='center'
              width="80">
              <template slot-scope="{row}">
                  <p>{{ row.orderLocal }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="還車點"
              align='center'
              width="80">
              <template slot-scope="{row}">
                  <p>{{ row.orderLocalBack }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="取車日期"
              align='center'
              width="100">
              <template slot-scope="{row}">
                  <p>{{ row.orderCar }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="還車日期"
              align='center'
              width="100">
              <template slot-scope="{row}">
                  <p>{{ row.orderCarBack }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="訂單狀態"
              align='center'
              width="80">
              <template slot-scope="{row}">
                  <p>{{ row.orderStatus }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="訂單日期"
              align='center'
              width="100">
              <template slot-scope="{row}">
                  <p>{{ row.orderDate }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <TableInfo :tableData='tableData' v-show="show===true" :windowsWidth='windowsWidth'/>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total='pagination.total'
        :pageSize='pagination.pageSize'
        :currentPage='pagination.currentPage'>
      </el-pagination>
    </section>
  </div>
</template>

<script>
import HomeSide from '../../components/HomeSide/index'
import TableInfo from './components/tableInfo'
import { setPage } from '@/utils/setPage'

export default {
  name: 'UserOrder',
  components: {
    HomeSide,
    TableInfo
  },
  data () {
    return {
      userId: null,
      tableData: null,
      show: false,
      windowsWidth: null,
      pagination: {
        total: 0, // 總頁碼數 10 才會兩頁
        pageSize: 0, // 每頁要顯示的資料
        currentPage: 1 // 默認初始頁數，支持 .sync 修饰符
      }
    }
  },
  created () {
    this.userId = this.$store.getters.user.id
    this.orderOne()
    this.$nextTick(() => {
      this.handleResize()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy () {
    // 組件銷毀時，銷毀監聽事件
    window.removeEventListener('resize', this.handleResize)
  },
  /**
    @method
      orderOne              得到目前登入的 user 自己的 order
      setPagination         設定分頁資料數量
      handleCurrentChange   分頁切換
      handleResize          判斷視窗事件
  */
  methods: {
    async orderOne () {
      await this.$store.dispatch('order/getOrder')
      await this.$store.commit('order/GET_HOME_ORDERONE', this.userId)
      this.tableData = this.$store.getters.ordersOne
      this.setPagination()
    },
    // 初始分頁設定
    setPagination () {
      this.pagination.pageSize = 8
      this.pagination.total = this.tableData.length
      this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
    },
    // 分頁切換
    async handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.tableData = await this.$store.getters.orders
      this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
    },
    handleResize () {
      this.windowsWidth = window.innerWidth
      if (window.innerWidth < 1150) {
        this.show = true
      } else {
        this.show = false
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  max-width: 1200px;
  margin: 0px auto;
}
.order-table {
  margin-top: 35px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media screen and (max-width: 780px) {
  .side {
    display: none
  }
}

</style>
