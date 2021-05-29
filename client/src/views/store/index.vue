<template>
  <div class='storeArea'>
   <FilterStore
      @update:filtStoreName='handleFilterStoreName'
      :editUpdate='editUpdate'
      :editDeleteOption='editDeleteOption'/>
    <section class="form_container">
      <el-table
        type="flex" justify="center" align="middle"
        :data="tableData"
        max-height="450">
        <el-table-column
          label="名稱"
          align='center'
          width="180">
          <template slot-scope="{row}">
             <p>{{ row.storeName }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="地址"
          align='center'
          width="350">
          <template slot-scope="{row}">
              <p>{{ row.storeAddress }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="電話"
          align='center'
          width="180">
          <template slot-scope="{row}">
              <p>{{ row.storePhone }}</p>
          </template>
        </el-table-column>

        <el-table-column
          label="訂單量"
          align='center'
          width="180">
          <template slot-scope="{row}">
              <p>{{ row.storeOrder }}</p>
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
            <DialogFound :dialog='dialog' :form='form' @update:updateData='getStores'></DialogFound>
            <el-button
              size="mini"
              type="danger"
              class="btn"
              @click="handleDelete(row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template>
          <el-button
            type="primary"
            icon="el-icon-plus"
            round
            class="buttonPlus"
            @click="handleAdd">
          </el-button>
          <DialogFound :dialog='dialog' :form='form' @update:updateData='getStores'></DialogFound>
      </template>
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
import FilterStore from './components/FilterStore'
import DialogFound from '@/components/DialogFound/storeDF'
import { setPage } from '@/utils/setPage'
import { mapGetters } from 'vuex'

export default {
  name: 'Store',
  components: {
    FilterStore,
    DialogFound
  },
  data () {
    return {
      add: 'add',
      edit: 'edit',
      tableData: null,
      filterTableData: null,
      filterUpdateTableData: null,
      form: {
        storeName: '',
        storePhone: '',
        storeAddress: '',
        storeOrder: ''
      },
      dialog: {
        show: false
      },
      filterStore: '',
      editUpdate: '',
      editDeleteOption: '',
      pagination: {
        total: 0, // 總頁碼數 10 才會兩頁
        pageSize: 0, // 每頁要顯示的資料
        currentPage: 1 // 默認初始頁數，支持 .sync 修饰符
      }
    }
  },
  created () {
    this.getStores()
  },
  computed: {
    ...mapGetters(['user'])
  },
  /**
  @method
    getStores             得到全部資料
    handleDelete          刪除單一資料
    handleEdit            編輯單一資料
    handleAdd             新增單一資料
    setPagination         初始分頁設定
    handleCurrentChange   分頁頁碼切換資料處理
    handleFilterStoreName    篩選 storeName 資料處理

  @param
    this.tableData        顯示當前的畫面的資料
    this.editUpdate       未篩選更新 edit 資料值 ＆ 篩選更新 edit 資料值 -> 會觸發 FilterMoto watch
    this.filterStore      篩選 store 的資料值
    this.filterTableData  篩選 store 更新的 tableData 資料
    this.filterUpdateTableData  篩選後 edit 更新的 store 資料
    this.editDeleteOption       刪除後通知 option 要更新 -> 會觸發 FilterMoto watch 更新 store
  */
  methods: {
    async getStores (value) {
      await this.$store.dispatch('store/getStore')
      if (value) {
        this.editUpdate = value
        if (this.filterStore) {
          await this.$store.dispatch('store/getStore')
          if (this.editUpdate) {
            await this.$store.commit('store/SET_FILTER_STORENAME', this.filterStore)
            this.tableData = await this.$store.getters.selectStores
          } else {
            // 用篩選的 filterStore 當參數，不使用 editUpdate 避免跳轉
            await this.$store.commit('store/SET_FILTER_STORENAME', this.filterStore)
            this.tableData = await this.$store.getters.selectStores
          }
          this.filterUpdateTableData = this.tableData
        } else {
          this.tableData = await this.$store.getters.stores
        }
        this.setPagination()
        // 把上一次編輯狀態清除，可讓下次編輯之後進入 filterMoto 更新 option
        this.editUpdate = ''
      } else {
        if (this.filterStore) {
          await this.$store.commit('store/SET_FILTER_STORENAME', this.editDeleteOption.storeName)
          this.tableData = await this.$store.getters.selectStores
          this.setPagination()
        } else {
          this.tableData = await this.$store.getters.stores
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
        if (this.filterStore) {
          await this.$store.commit('store/SET_FILTER_STORENAME', this.filterStore)
          this.tableData = await this.$store.getters.selectStores
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        } else {
          this.tableData = await this.$store.getters.stores
          this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
        }
      } else if (this.filterStore !== '') {
        await this.$store.commit('store/SET_FILTER_STORENAME', this.filterStore)
        this.tableData = await this.$store.getters.selectStores
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      } else {
        this.tableData = await this.$store.getters.stores
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      }
    },

    handleAdd (row) {
      this.dialog = {
        show: true
      }
      // 這邊再帶 from 進去是為了清除 edit 的資料
      this.form = {
        id: row.id,
        storeName: row.storeName,
        storePhone: row.storePhone,
        storeAddress: row.storeAddress,
        storeOrder: row.storeOrder,
        status: 'add'
      }
    },

    async handleDelete (row) {
      await this.$store.dispatch('store/deleteStore', row.id)
        .then(res => {
          this.$swal.fire({
            icon: 'success',
            title: '刪除成功'
          })
          this.getStores()
          this.$store.commit('store/DELETE_STORE', row.id)
          const newStores = this.$store.getters.stores
          this.$store.commit('store/GET_FILTER_STORE', newStores)
          // 傳給 filterMoto 通知要更新 store option
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
        storeName: row.storeName,
        storePhone: row.storePhone,
        storeAddress: row.storeAddress,
        storeOrder: row.storeOrder,
        status: 'edit'
      }
    },

    async handleFilterStoreName (value) {
      this.filterStore = value
      if (this.filterStore !== '') {
        await this.$store.commit('store/SET_FILTER_STORENAME', this.filterStore)
        this.tableData = await this.$store.getters.selectStores
        this.filterTableData = this.tableData
        this.pagination.currentPage = 1
        this.setPagination()
      } else {
        // 沒有 option 顯示
        await this.$store.dispatch('store/getStore')
        this.tableData = await this.$store.getters.stores
        this.setPagination()
      }
    }
  }
}

</script>
<style lang="scss" scoped>

.storeArea {
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

</style>
