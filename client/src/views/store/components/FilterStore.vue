<template>
  <div class="form_container">
     <el-form
         ref="form"
         :inline="true"
         label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item class="store_container">
              <el-select  placeholder="名稱"  v-model="storeName" clearable @change='getStoreName'>
                <el-option  v-for="item in storeNameOptions" :key="item.id" :label="item.storeName" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>
/**
  @desc 篩選店家
  @params
    oldData             -> 舊的 edit 資料
    newData             -> 新的 edit 資料
    oldOption           -> 舊的 option 資料
    newOption           -> 新的 option 資料
*/
export default {
  name: 'FilterStore',
  data () {
    return {
      oldData: null,
      newData: null,
      oldOption: null,
      newOption: null,
      storeNameOptions: null,
      storeName: null
    }
  },
  props: {
    editUpdate: {
      type: [String, Object, Array]
    },
    editDeleteOption: {
      type: [String, Object, Array]
    }
  },
  created () {
    this.getfilterData()
  },
  watch: {
    // 判斷編輯資料是不是目前現有的，而不是新增的資料
    editUpdate: function (newData, oldData) {
      this.newData = newData
      this.oldData = oldData
      if (!oldData) {
        this.updatfilterData(newData)
      }
      this.updatfilterData(oldData)
    },
    editDeleteOption: function (newOption, oldoption) {
      this.newOption = newOption
      this.oldoption = oldoption
      if (!oldoption) {
        this.deleteOption(newOption)
      }
      this.deleteOption(oldoption)
    }
  },
  /**
    @desc
      getfilterData 設定 全部資料 & select option 選項
      getStoreName 取得 option 值時，再傳給父元件做顯示
    @method
      getfilterData    取得全部資料
      getStoreName     取到的商店
      updatfilterData  更新篩選資料
      deleteOption     更新刪除後的選項
  */
  methods: {
    async getfilterData () {
      await this.$store.dispatch('store/getStore')
      this.storeNameOptions = await this.$store.getters.selectStores
    },
    getStoreName (value) {
      this.$emit('update:filtStoreName', value)
    },
    updatfilterData (value) {
      // 重新取的 store option ，不然更新之後會變成當前篩選的 option
      this.getfilterData()
      this.storeNameOptions = this.$store.getters.selectStores
    },
    deleteOption (value) {
      this.getfilterData()
      this.storeNameOptions = this.$store.getters.selectStores
    }
  }
}
</script>

<style lang="scss" scoped>
.form_container {
  background-color: white;
  margin-bottom: 25px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 10px #cccc;
}

.store_container {
  margin: 20px;
}

@media screen and (min-width: 1441px){
  .el-form-item .el-select {
    width: 50rem;
  }
}

@media screen and (min-width: 700px) and (max-width: 1441px){
  .el-form-item .el-select {
    width: 50rem;
  }
}

@media screen and (max-width: 1025px) {
  .el-form-item .el-select {
    width: 30rem;
  }
}

@media screen and (max-width: 800px) {
  .el-form-item .el-select {
    width: 20rem;
  }
}

@media screen and (min-width: 300px) and (max-width: 700px) {
  .el-form-item .el-select {
    width: 10rem;
  }
  .el-col-12 {
    width: auto;
  }
}
</style>
