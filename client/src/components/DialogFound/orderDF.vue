<template>
  <el-dialog
    :visible.sync="dialog.show"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :append-to-body="true"
    width='500px'>
    <el-form
      :model="form"
      :rules="form_rules"
      ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="數量" prop="orderCarNumbers" :label-width="formLabelWidth">
            <el-input v-model="form.orderCarNumbers" placeholder="請輸入名稱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="訂單狀態" prop="orderStatus" :label-width="formLabelWidth">
            <el-select v-model="form.orderStatus" placeholder="請選擇">
              <el-option label="未完成" value="未完成"></el-option>
              <el-option label="完成" value="完成"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(form)">取消</el-button>
      <el-button type="primary" @click="submitAdd('form')" v-if="form.status == 'add'">確定</el-button>
      <el-button type="primary" @click="submitEdit('form')" v-if="form.status === 'edit'">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
  @desc 修改值
  1.驗證輸入值
  2.取值
  3.打 api
*/
import { validateNumber } from '@/utils/vaildate.js'

export default {
  name: 'orderDF',
  props: {
    dialog: {
      show: Boolean
    },
    form: {
      orderCarNumbers: String,
      orderStatus: String,
      UserId: Number,
      MotoHouseId: Number,
      StoreId: Number,
      status: String
    }
  },
  data () {
    return {
      formLabelWidth: '80px',
      form_rules: {
        orderCarNumbers: [
          { required: true, validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
  /**
    @desc 編輯、新增 dialog
    @method
      uploadUrl           -> 上傳圖片
      submitAdd           -> 新增
      submitEdit          -> 編輯
      resetForm           -> 取消
  */
  methods: {
    submitAdd (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('store/addStore', this.form)
            .then(res => {
              this.$swal.fire({
                icon: 'success',
                title: res.message
              })
              this.$emit('update:updateData', this.form)
            })
            .catch(err => {
              if (err.data) {
                this.$swal.fire({
                  icon: 'error',
                  title: err.data.message
                })
              }
            })
        }
      })
      this.dialog.show = false
    },
    submitEdit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('order/updateOrder', this.form)
            .then(res => {
              this.$swal.fire({
                icon: 'success',
                title: '修改成功'
              })
              this.$emit('update:updateData', this.form)
            })
            .catch(err => {
              if (err.data) {
                this.$swal.fire({
                  icon: 'error',
                  title: err.data.message
                })
              }
            })
        }
      })
      this.dialog.show = false
    },
    resetForm () {
      this.dialog.show = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

.el-col-24 {
    width: 50%;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.updateImage {
  margin-left: 80px;
}

</style>
