<template>
  <div>
    <div class="product-hot">
      <div class="product-box" v-for="item in tableData" :key="item.id" @click="detailInfo(item)">
        <img :src='`${item.image}`' alt="" class="box-img">
        <div class="box-container">
          <div class="box-header">
            <div class="motoCatalog">{{item.motoCatalog}}</div>
            <span>{{item.cc}}cc</span>
          </div>
          <div class="box-footer">
            <div class="moto">{{item.motoStore}}</div>
            <div class="infoBtn">
              <el-button  size="small" icon="el-icon-search" class="btnStyle"> 詳細內容 </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
        v-if="this.$route.name === 'Moto'"
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
import { setPage } from '@/utils/setPage'

/**
  @desc 接收從 moto 的篩選組件 FilterHomeMoto 的資料
*/
export default {
  name: 'Product',
  data () {
    return {
      filterStore: '',
      test: null,
      filterCC: '',
      tableData: [],
      pagination: {
        total: 0, // 總頁碼數 10 才會兩頁
        pageSize: 0, // 每頁要顯示的資料
        currentPage: 1 // 默認初始頁數，支持 .sync 修饰符
      }
    }
  },
  props: {
    motoStore: {
      type: [Array]
    },
    motoCC: {
      type: [Array]
    }
  },
  watch: {
    motoStore: function (newData, oldData) {
      this.filterMotoStore(newData)
    },
    motoCC: function (newData, oldData) {
      this.filterMotoCC(newData)
    }
  },
  created () {
    this.allMoto()
    this.setPagination()
  },
  /**
  @method
    allMoto            用 router 判斷進入點，產生不同資料數量
    filterMotoStore    篩選 motoStore （不同篩選方式）
    filterMotoCC       篩選 cc （不同篩選方式）
  */
  methods: {
    allMoto () {
      this.tableData = this.$store.getters.motos
      if (this.$route.name === 'HomePage') {
        return this.tableData.filter(item => {
          return item.id < 10
        })
      } else {
        return this.tableData
      }
    },
    // 篩選 motoSotre
    filterMotoStore (value) {
      this.filterStore = value[0]
      this.filterCC = value[1]
      if (this.filterStore && this.filterCC) {
        this.$store.commit('motoHouse/SET_HOME_ADVCC', [this.filterStore, this.filterCC])
        this.tableData = this.$store.getters.seletHomeCC
      } else if (!this.filterStore && this.filterCC) {
        this.$store.commit('motoHouse/SET_HOME_CC', this.filterCC)
        this.tableData = this.$store.getters.seletHomeCC
      } else if (this.filterStore && !this.filterCC) {
        this.$store.commit('motoHouse/SET_HOME_MOTOSTORE', this.filterStore)
        this.tableData = this.$store.getters.seletHomeMotos
      } else {
        this.tableData = this.$store.getters.motos
      }
      this.pagination.currentPage = 1
      this.setPagination()
      this.$emit('update:editUpdate', this.filterStore)
    },
    // 篩選 cc
    filterMotoCC (value) {
      this.filterStore = value[0]
      this.filterCC = value[1]
      if (!this.filterStore && this.filterCC) {
        this.$store.commit('motoHouse/SET_HOME_CC', this.filterCC)
        this.tableData = this.$store.getters.seletHomeCC
      } else if (this.filterStore && this.filterCC) {
        this.$store.commit('motoHouse/SET_HOME_ADVCC', [this.filterStore, this.filterCC])
        this.tableData = this.$store.getters.seletHomeCC
      } else if (this.filterStore && !this.filterCC) {
        this.$store.commit('motoHouse/SET_HOME_MOTOSTORE', this.filterStore)
        this.tableData = this.$store.getters.seletHomeMotos
      } else {
        this.tableData = this.$store.getters.motos
        this.motoCCoptions = this.$store.getters.seletHomeCC
      }
      this.pagination.currentPage = 1
      this.setPagination()
    },
    setPagination () {
      this.pagination.pageSize = 8
      this.pagination.total = this.tableData.length
      this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
    },
    async handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      if (this.filterStore) {
        await this.$store.commit('motoHouse/SET_HOME_MOTOSTORE', this.filterStore)
        this.tableData = await this.$store.getters.seletHomeMotos
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      } else if (this.filterCC) {
        await this.$store.commit('motoHouse/SET_HOME_CC', this.filterCC)
        this.tableData = await this.$store.getters.seletHomeCC
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      } else {
        this.tableData = await this.$store.getters.motos
        this.tableData = setPage(this.tableData, this.pagination.currentPage, this.pagination.pageSize)
      }
    },
    /**
      詳細資料動態跳轉抓 id 判斷，傳整個 item
    */
    detailInfo (item) {
      this.$router.push({
        path: `/motoDetail/${item.id}`,
        query: { item }
      })
    }
  }

}
</script>

<style lang='scss' scoped>
.product-hot{
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, 300px);
  height: 100%;
}

.product-box {
  margin: 10px 0;
  width: 300px;
  height: 300px;
  border: 1px solid #fff;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,21,41,.08);
}

.box-img {
  width: 300px;
  height: 190px;
  background-repeat: no-repeat;
  background-size: cover;
}
.box-header {
  display: flex;
  justify-content: space-between;
  margin: 20px 5px;
  .motoCatalog {
    font-size: 25px;
    font-weight: bold;
  }
  span {
    padding: 5px;
    background-color: grey;
    border:0 solid;
    border-radius: 30px;
    color:#fff;
  }
}

.box-footer {
  display: flex;
  justify-content: space-between;
  margin: 10px 5px;
  .moto {
    font-weight: bold;
  }
  .infoBtn {
    .btnStyle {
      font-weight: bold;
    }
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

</style>
