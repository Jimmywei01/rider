<template>
  <div class="form_container">
    <el-form
        ref="form"
        :inline="true"
        >
      <keep-alive>
      <div class="selectForm">
        <el-form-item class="motoStore_container">
          <el-select  placeholder="廠商"  v-model="motoStore" clearable  @change='getMotoStore'>
            <el-option  v-for="item in motoStoreOptions" :key="item.id" :label="item.motoStore" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="motoCC_container">
          <el-select label='排氣量' placeholder="排氣量"  v-model="motoCC" clearable  @change="getMotoCC">
            <el-option  v-for="item in motoCCoptions" :key="item.id" :label="item.motoCC" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </div>
      </keep-alive>
    </el-form>
  </div>
</template>

<script>
/**
  @desc 篩選廠商、車款
  @params
    motoStoreOptions    -> motoStore 選項
    motoStore           -> motoStore 資料值
    motoCCoptions       -> cc 選項
    motoCC              -> cc 資料值
*/
export default {
  name: 'FilterMoto',
  data () {
    return {
      motoStoreOptions: null,
      motoStore: '',
      motoCCoptions: null,
      motoCC: ''
    }
  },
  props: {
    editUpdate: {
      type: [String]
    }
  },
  created () {
    this.getfilterData()
  },
  watch: {
    editUpdate: function (newData, oldData) {
      this.updatfilterData(newData)
    }
  },
  /**
    @desc
      getfilterData 設定 全部資料 & select option 選項
      getMotoStore 取得 option 值，同時 getMotoStore 也要設定 option 值
      然後
      getMotoStore 取得 option 值時，再傳給父元件做顯示
      motoCCoptions 取得 option 值時，再傳給父元件做顯示
    @method
      getfilterData    取得全部資料
      getMotoStore     取得廠商選項
      getMotoCC        取得排氣量選項
      updatfilterData  更新篩選資料
  */
  methods: {
    async getfilterData () {
      await this.$store.dispatch('motoHouse/getMoto')
      this.motoStoreOptions = await this.$store.getters.seletHomeMotos
      this.motoCCoptions = await this.$store.getters.seletHomeCC
    },
    async getMotoStore (value) {
      this.motoStore = value
      await this.$store.commit('motoHouse/SET_HOME_CC', value)
      this.$emit('update:filtMotoStore', [value, this.motoCC])
    },
    /*
     取到 getMotoStore 值後，再給 getMotoCC 傳給父組件
    */
    async getMotoCC (value) {
      this.motoCC = value
      this.$emit('update:filtMotoCC', [this.motoStore, value])
    },
    /*
    更新編輯 motoStore 、motoCCoptions 顯示的 option
    沒值更新要重新取資料
    */
    async updatfilterData (value) {
      if (value !== '') {
        await this.$store.commit('motoHouse/GET_HOME_ADVCC', value)
        this.motoCCoptions = await this.$store.getters.seletHomeCC
      } else {
        this.getfilterData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.selectForm {
  display: flex;
  justify-content: center;
}

.motoStore_container {
  margin: 20px;
}

.motoCC_container {
  margin: 20px;
}

.el-form-item .el-select {
    width: 10rem;
  }
.search_col .motoCC_container {
    width:10rem;
  }

@media screen and (min-width: 300px) and (max-width: 700px) {
  .el-form-item .el-select {
    width: 8rem;
  }
  .el-col-12 {
    width: auto;
  }
}
</style>
