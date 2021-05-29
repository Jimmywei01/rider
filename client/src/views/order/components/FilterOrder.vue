<template>
  <div class="form_container">
     <el-form
         ref="form"
         :inline="true"
         label-width="80px">
        <el-row>
          <el-col :span="12" class="motoStore_col">
            <el-form-item class="motoStore_container">
              <el-select  placeholder="訂單狀態"  v-model="orderStatus" clearable  @change='getOrderStatus'>
                <el-option label="未完成" value="未完成"></el-option>
                <el-option label="完成" value="完成"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="motoCatalo_col">
            <el-form-item class="orderDate_container">
              <div class="block">
                <el-date-picker
                  v-model="dateValue"
                  type="date"
                  placeholder="選擇日期"
                  format="yyyy-MM-dd "
                  value-format="yyyy-MM-dd"
                  @change='getDate'>
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
/**
  @desc 篩選日期、訂單
  @params
    dateValue        篩選到的日期值
    orderStatus      訂單狀態
*/
export default {
  name: 'FilterMoto',
  data () {
    return {
      dateValue: '',
      orderStatus: ''
    }
  },
  methods: {
    async getOrderStatus (value) {
      this.$emit('update:OrderStatus', value)
    },
    async getDate (value) {
      this.$emit('update:filterDate', value)
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

.motoStore_container {
  margin: 20px;
}

.motoCatalog_container {
  margin: 20px;
}

.el-form-item .el-select{
    width: 25rem;
}

.search_col .motoCatalog_container {
    display: flex;
    width:28rem;
  }

.orderDate_container {
  margin: 20px;
  width: 22rem;
}

.search_col .search_container {
    display: flex;
    margin: 20px;
    width:25rem;
  }

@media screen and (max-width: 1441px) {
  .el-form-item .el-select {
    width: 22rem;
  }
  .search_col .motoCatalog_container {
    width:22rem;
  }
}

@media screen and (max-width: 1025px) {
  .form_container .el-row {
    display: flex;
  }
  .el-form-item .el-select {
    width: 15rem;
  }
}

@media screen and (max-width: 800px) {
  .form_container .el-row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .el-form-item .el-select {
    width: 15rem;
  }
}

@media screen and (min-width: 300px) and (max-width: 700px) {
  .form_container .el-row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-form-item .el-select {
    width: 10rem;
  }
  .el-col-12 {
    width: auto;
  }
}
</style>
