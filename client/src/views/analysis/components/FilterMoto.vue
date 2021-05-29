<template>
  <div>
    <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item class="motoStore_container">
              <el-select  placeholder="廠牌"  v-model="motoStore"  @change='getMotoStore'>
                <el-option  v-for="item in motoStoreOptions" :key="item.id" :label="item.motoStore" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>
/**
  @desc 篩選廠商、車款
  @params
    motoStoreOptions    -> motoStore 選項
    motoStore           -> motoStore 資料值
*/
export default {
  name: 'FilterMoto',
  data () {
    return {
      motoStoreOptions: null,
      motoStore: '',
      seletDataCatalog: '',
      seletDataNum: ''
    }
  },
  created () {
    this.getfilterData()
    this.getMotoStore()
  },
  /**
    @desc 傳給 MotoCatalogChrt 當資料顯示
    @method
      getfilterData    取得全部資料
      getMotoStore     取得廠商選項
  */
  methods: {
    async getfilterData () {
      await this.$store.dispatch('motoHouse/getMoto')
      this.motoStoreOptions = await this.$store.getters.seletMotos
      // console.log('一開始的StoreOptions:', this.motoStoreOptions)
    },
    async getMotoStore (value) {
      // console.log('廠商篩選值:', value)
      await this.$store.commit('motoHouse/GET_CHART_MOTODATA', value)
      this.seletDataCatalog = await this.$store.getters.seletDataCatalog
      this.seletDataNum = await this.$store.getters.seletDataNum
      this.$emit('update:filtMotoStore', [this.seletDataCatalog, this.seletDataNum])
    }
  }
}
</script>

<style lang="scss" scoped>
.motoStore_container {
  margin: 20px;
}

.el-form-item .el-select{
  width: 15rem;
}

</style>
