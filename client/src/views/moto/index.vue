<template>
  <div>
    <div class="header-container">
        <div class="header-Img"></div>
    </div>
    <div class="container">
      <FilterHomeMoto
      @update:filtMotoStore='handleFilterMotoStore'
      @update:filtMotoCC='handleFilterMotoCC'
      :editUpdate='editUpdate'
      />
      <Product
      @update:editUpdate='handleEditUpdate'
      :motoStore='motoStore'
      :motoCC = 'motoCC'
      />
    </div>
  </div>
</template>

<script>
import FilterHomeMoto from './components/FilterHomeMoto'
import Product from '../../components/Product/index'
export default {
  name: 'Moto',
  components: {
    FilterHomeMoto,
    Product
  },
  data () {
    return {
      motoStore: [],
      motoCC: [],
      editUpdate: '',
      pagination: {
        total: 0, // 總頁碼數 10 才會兩頁
        pageSize: 0, // 每頁要顯示的資料
        currentPage: 1 // 默認初始頁數，支持 .sync 修饰符
      }
    }
  },
  methods: {
    handleFilterMotoStore (value) {
      this.motoStore = value
    },
    handleFilterMotoCC (value) {
      this.motoCC = value
    },
    handleEditUpdate (value) {
      this.editUpdate = value
    }
  }
}
</script>

<style scoped>
.header-container {
  height: 600px;
}
.header-Img {
  background-image: url("../../assets/img/pexels-pixabay2.jpg");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  min-height: 100%;
  opacity: 0.9;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
