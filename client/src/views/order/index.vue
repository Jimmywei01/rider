<template>
  <div class="container">
    <FilterOrder
      @update:OrderStatus='handleFilterOrderStatus'
      @update:filterDate='handleFilterDate'/>
    <section class="form_container">
      <el-table
        type="flex" justify="center" align="middle"
        :data="tableData"
        max-height="450">
        <el-table-column
          label="名稱"
          align='center'
          width="120">
          <template slot-scope="{row}">
             <p>{{ row.User.username }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="電話"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.User.phone }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="車廠"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.MotoHouse.motoStore}}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="車款"
          align='center'
          width="150">
          <template slot-scope="{row}">
              <p>{{ row.MotoHouse.motoCatalog }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="數量"
          align='center'
          width="100">
          <template slot-scope="{row}">
              <p>{{ row.orderCarNumbers }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="取車點"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.orderLocal }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="還車點"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.orderLocalBack }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="取車日期"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.orderCar }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="還車日期"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.orderCarBack }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="訂單狀態"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.orderStatus }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="訂單日期"
          align='center'
          width="120">
          <template slot-scope="{row}">
              <p>{{ row.orderDate }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="Actions"
          align='center'
          width="180">
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              class="btn"
              @click="handleEdit(row)">Edit
            </el-button>
            <DialogFound :dialog='dialog' :form='form' @update:updateData='getOrders'></DialogFound>
            <el-button
              size="mini"
              type="danger"
              class="btn"
              @click="handleDelete(row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-pagination
      background
      layout="prev, pager, next"
       @current-change="handleCurrentChange"
      :total='pagination.total'
      :pageSize='pagination.pageSize'
      :currentPage='pagination.currentPage'>
    </el-pagination>
  </div>
</template>

<script>
import FilterOrder from './components/FilterOrder'
import DialogFound from '@/components/DialogFound/orderDF'
import { setPage } from '@/utils/setPage'

export default {
  name: 'Order',
  components: {
    DialogFound,
    FilterOrder
  },
  data () {
    return {
      edit: 'edit',
      tableData: null,
      form: {
        orderCarNumbers: '',
        orderStatus: ''
      },
      dialog: {
        show: false
      },
      filterOrder: '',
      editDeleteOption: '',
      pagination: {
        total: 0, // 總頁碼數 10 才會兩頁
        pageSize: 0, // 每頁要顯示的資料
        currentPage: 1 // 默認初始頁數，支持 .sync 修饰符
      },
      getOrderStatus: null
    }
  },
  created () {
    this.getOrders()
  },
  /**
  @method
    getOrders              得到全部資料
    handleDelete          刪除單一資料
    handleEdit            編輯單一資料
    handleAdd             新增單一資料
    setPagination         初始分頁設定
    handleCurrentChange   分頁頁碼切換資料處理
    handleFilterOrderStatus  篩選 order狀態資料
    handleFilterDate  篩選 date 資料

  @param
    this.tableData          顯示當前的畫面的資料
    this.filterOrder        篩選 order 的資料值
    this.editDeleteOption   要刪除的選項資料
    this.filterDate         篩選的日期
  */
  methods: {
    async getOrders (value) {
      await this.$store.dispatch('order/getOrder')
      this.tableData = await this.$store.getters.orders
      // 為篩選更篩選後的要分開
      if (value) {
        // 通知 filter motoStore motoCatalog 資料要變動
        if (this.filterDate && this.filterOrder) {
          await this.$store.commit('order/GET_FILTER_DATESTATUS', [this.filterDate, this.filterOrder])
          this.tableData = await this.$store.getters.selectOrders
          this.pagination.currentPage = 1
        } else if (this.filterDate) {
          await this.$store.commit('order/GET_FILTER_ORDERDATE', this.filterDate)
          this.tableData = await this.$store.getters.selectOrders
          this.pagination.currentPage = 1
        } else if (this.filterOrder) {
          await this.$store.commit('order/GET_FILTER_ORDERSTATUS', this.filterOrder)
          this.tableData = await this.$store.getters.selectOrders
          this.pagination.currentPage = 1
        } else {
          this.tableData = await this.$store.getters.orders
        }
        this.setPagination()
      } else {
        if (this.filterDate && this.filterOrder) {
          await this.$store.commit('order/GET_FILTER_DATESTATUS', [this.filterDate, this.filterOrder])
          this.tableData = await this.$store.getters.selectOrders
          this.pagination.currentPage = 1
          this.setPagination()
        } else if (this.filterOrder) {
          await this.$store.commit('order/GET_FILTER_ORDERSTATUS', this.editDeleteOption.orderStatus)
          this.tableData = await this.$store.getters.selectOrders
          this.pagination.currentPage = 1
          this.setPagination()
        } else if (this.filterDate) {
          await this.$store.commit('order/GET_FILTER_ORDERDATE', this.filterDate)
          this.tableData = await this.$store.getters.selectOrders
          this.pagination.currentPage = 1
          this.setPagination()
        } else {
          this.tableData = await this.$store.getters.orders
          this.setPagination()
        }
      }
    },
    // 初始分頁設定
    setPagination () {
      this.pagination.pageSize = 5
      this.pagination.total = this.tableData.length
      this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
    },
    // 分頁切換
    async handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      if (this.editDeleteOption) {
        if (this.filterOrder) {
          await this.$store.commit('order/GET_FILTER_ORDERSTATUS', this.filterOrder)
          this.tableData = await this.$store.getters.selectOrders
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        } else {
          this.tableData = await this.$store.getters.orders
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        }
      } else if (this.filterOrder !== '') {
        if (this.filterDate && this.filterOrder) {
          await this.$store.commit('order/GET_FILTER_DATESTATUS', [this.filterDate, this.filterOrder])
          this.tableData = await this.$store.getters.selectOrders
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        } else {
          await this.$store.commit('order/GET_FILTER_ORDERSTATUS', this.filterOrder)
          this.tableData = await this.$store.getters.selectOrders
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        }
      } else if (this.filterDate !== '' && this.filterDate !== undefined) {
        await this.$store.commit('order/GET_FILTER_ORDERDATE', this.filterDate)
        this.tableData = await this.$store.getters.selectOrders
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      } else {
        this.tableData = await this.$store.getters.orders
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      }
    },

    async handleDelete (row) {
      await this.$store.dispatch('order/deleteOrder', row.id)
        .then(res => {
          this.$swal.fire({
            icon: 'success',
            title: '刪除成功'
          })
          this.getOrders()
          this.editDeleteOption = row
        })
        .catch(err => {
          if (err.data) {
            this.$swal.fire({
              icon: 'error',
              title: err.data
            })
          }
        })
    },

    handleEdit (row) {
      this.dialog = {
        show: true
      }
      this.form = {
        id: row.id,
        orderCarNumbers: row.orderCarNumbers,
        orderStatus: row.orderStatus,
        UserId: row.User.id,
        MotoHouseId: row.MotoHouse.id,
        status: 'edit'
      }
    },

    async handleFilterOrderStatus (value) {
      this.filterOrder = value
      if (this.filterOrder !== '') {
        if (this.filterDate && this.filterOrder) {
          await this.$store.commit('order/GET_FILTER_DATESTATUS', [this.filterDate, this.filterOrder])
          this.tableData = await this.$store.getters.selectOrders
        } else {
          await this.$store.commit('order/GET_FILTER_ORDERSTATUS', this.filterOrder)
          this.tableData = await this.$store.getters.selectOrders
        }
        this.pagination.currentPage = 1
        this.setPagination()
      } else if (this.filterOrder === '' && this.filterDate) {
        await this.$store.commit('order/GET_FILTER_ORDERDATE', this.filterDate)
        this.tableData = await this.$store.getters.selectOrders
        this.setPagination()
      } else {
        this.tableData = await this.$store.getters.orders
        this.setPagination()
      }
    },

    async handleFilterDate (value) {
      this.filterDate = value
      if (this.filterDate !== null) {
        if (this.filterDate && this.filterOrder) {
          // 同時篩選狀態＆日期
          await this.$store.commit('order/GET_FILTER_DATESTATUS', [this.filterDate, this.filterOrder])
          this.tableData = await this.$store.getters.selectOrders
        } else {
          await this.$store.commit('order/GET_FILTER_ORDERDATE', value)
          this.tableData = await this.$store.getters.selectOrders
        }
      } else {
        this.filterDate = ''
        await this.$store.commit('order/GET_FILTER_ORDERSTATUS', this.filterOrder)
        this.tableData = await this.$store.getters.selectOrders
      }
      if (!this.filterDate && !this.filterOrder) {
        this.tableData = await this.$store.getters.orders
      }
      this.pagination.currentPage = 1
      this.setPagination()
    }
  }

}
</script>
<style lang="scss" scoped>

.container {
  max-width: 1350px;
}

.form_container {
  background-color: white;
  margin-bottom: 25px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 10px #cccc;
}

.btn{
  margin-right: 5px;
  min-width: 60px;
}

.buttonPlus {
  margin: 15px;
  height: 100%;
  padding: 10px 10px;
  box-shadow: 0px 5px 20px #cccc;
}

@media screen and (max-width: 800px) {
  .form_container {
    width: 100%;
  }
}
</style>
