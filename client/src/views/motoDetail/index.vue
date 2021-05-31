<template>
  <div>
    <div class="container">
      <div class="header-container">
        <div class="header-Img"></div>
      </div>
      <section>
      <div class="detailItem-box">
        <div class="box-Info"><p>機車</p></div>
        <div class="box-container">
          <img src= '' ref="main" class='user-avatar' alt=""/>
          <div class="box-reservation">
            <el-form
            :model="form"
            :rules="form_rules"
              ref="form">
            <div class="reservation-header">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="廠商">
                    <div>{{item.motoStore}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="車款">
                    <div>{{item.motoCatalog}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="數量" prop="orderCarNumbers">
                    <el-input v-model="form.orderCarNumbers" placeholder="請輸入預約數量" style="width:200px"></el-input>
                    <div>剩餘數量: {{this.undoneNumber}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="reservation-container">
              <el-row>
                <el-col :span="12">
                  <div class="container-orderLocal">
                    <el-form-item label="取車地點" prop="orderLocal">
                      <el-select  placeholder="取車點"  v-model="form.orderLocal" clearable>
                        <el-option  v-for="item in local" :key="item.id" :label="item.motoStore" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="container-orderLocal">
                    <el-form-item label="還車地點" prop="orderLocalBack">
                      <el-select  placeholder="還車點"  v-model="form.orderLocalBack" clearable>
                        <el-option  v-for="item in local" :key="item.id" :label="item.motoStore" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="取車日期" prop="orderCar">
                    <el-date-picker
                      v-model="form.orderCar"
                      type="date"
                      placeholder="選擇日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      prop="orderCar"
                      class="container-orderDate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="還車日期" prop="orderCarBack">
                    <el-date-picker
                    v-model="form.orderCarBack"
                    type="date"
                    placeholder="選擇日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    prop="orderCarBack">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="reservation-footer">
              <el-button type="primary" plain @click="onSubmit('form')">預約</el-button>
            </div>
          </el-form>
          </div>
        </div>
      <div class="box-footer">
        <p>介紹</p>
      <div>{{item.description}}</div>
    </div>
    </div>
    </section>
    </div>
  </div>
</template>

<script>
import { validateNumber, validateOrderLocal, validateDate } from '@/utils/vaildate.js'

/**
  @desc 預約表單
  @param
    id             -> 進來的 motoHouse id
    item           -> 進來的 motoHouse 資料
    initialNumber  -> 初始數量
    undoneNumber   -> 剩下數量
    orderItem      -> 要傳送給 orderItem 的資料
    item_rules     -> 檢查規則
*/
export default {
  name: 'motoDetail',
  data () {
    return {
      id: null,
      item: {},
      initialNumber: null,
      undoneNumber: null,
      local: [],
      form: {
        motoStore: null,
        motoCatalog: null,
        orderCarNumbers: null,
        orderLocal: '',
        orderLocalBack: '',
        orderCar: '',
        orderCarBack: '',
        UserId: null
      },
      form_rules: {
        orderCarNumbers: [
          { required: true, validator: validateNumber, trigger: 'blur' }
        ],
        orderLocal: [
          { required: true, validator: validateOrderLocal, trigger: 'change' }
        ],
        orderLocalBack: [
          { required: true, validator: validateOrderLocal, trigger: 'change' }
        ],
        orderCar: [
          { required: true, validator: validateDate, trigger: 'change' }
        ],
        orderCarBack: [
          { required: true, validator: validateDate, trigger: 'change' }
        ]
      },
      itemImage: ''
    }
  },
  created () {
    this.id = this.$route.params.id
    this.form.UserId = this.$store.getters.user.id
  },
  mounted () {
    this.motOne()
    this.getLocal()
  },
  /**
    @desc 顯示單一資料，並可預約當前資料
    @method
      motOne        取得當前資料 Info，並整理，計算剩餘數量
      getLocal      取得地點資料
      onSubmit      發送 api
  */
  methods: {
    async motOne () {
      // 從 homepage 當前進入的資料，重取資料避免重整時{object,object}
      this.$store.commit('motoHouse/SET_HOME_MOTONE', this.id)
      this.item = this.$store.getters.selectHomeMotoOne
      this.itemImage = this.item.image
      this.$refs.main.src = this.itemImage
      this.initialNumber = this.item.numbers
      this.form.motoStore = this.item.motoStore
      this.form.motoCatalog = this.item.motoCatalog
      await this.$store.dispatch('order/getOrder')
      // 剩餘數量
      this.$store.commit('order/GET_HOME_UNDONENUMBERS', [this.id, this.initialNumber, this.form.orderCarNumbers])
      this.undoneNumber = this.$store.getters.undoneNumbers
    },
    getLocal () {
      this.local = this.$store.getters.selectStores
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('order/addOrder', this.form)
            .then(res => {
              this.$refs[form].resetFields()
              this.motOne()
              this.$swal.fire({
                icon: 'success',
                title: '預約成功'
              })
            }).then(res => {
              // 跳轉到 userOrder
              this.$router.push({
                path: `/userOrder/${this.form.UserId}`
              })
            })
            .catch(error => {
              if (error.data) {
                this.$swal.fire({
                  icon: 'error',
                  title: error.data.message || '請登入或註冊'
                })
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: none;
}

.user-avatar {
  width: 500px;
  height: 450px;
  padding: 25px;
}

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

.detailItem-box {
  max-width: 1200px;
  margin: 0 auto;
}

.box-Info p {
  display: block;
  border-bottom: solid;
  text-align: center;
  padding-bottom: 5px;
  font-size: larger;
}

.box-container {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  margin-bottom: 20px;
}

.box-reservation {
  width: 450px;
  border: 1px solid #fff;
  background: #fff;
  box-shadow: 0px 2px 10px #cccc;
  padding: 15px;
}

.box-footer p {
  display: block;
  border-bottom: solid;
  text-align: start;
  padding-bottom: 5px;
  font-size: larger;
}

.box-img {
  height: auto;
  width: 50%;
}

.container-orderDate .el-input__inner {
  width: 193px;
  background-color: yellow;
}

.reservation-footer {
  text-align: center;
}

@media screen and (max-width: 1025px) {
  .box-container {
    margin: 15px;
    justify-content: center;
  }
  .box-img {
    margin-bottom: 20px;
  }
  .box-reservation {
    margin-bottom: 20px;
  }
}

@media screen and (min-width: 500px) {
  .el-form-item .el-select {
    width: 200px;
  }
  .el-form-item .el-input {
    width: 200px;
  }
}

@media screen and (max-width: 500px) {
  .user-avatar {
    width: 450px;
    height: 400px;
  }
  .el-form-item .el-select {
    width: 120px;
  }
  .el-form-item .el-input {
    width: 120px;
  }
}

@media screen and (max-width: 375px) {
  .user-avatar {
    width: 400px;
    height: 350px;
  }
}

@media screen and (max-width: 320px) {
  .user-avatar {
    width: 350px;
    height: 300px;
  }
}

</style>
