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
        <el-col :span="12">
          <el-form-item label="名稱" prop="storeName" :label-width="formLabelWidth">
            <el-input v-model="form.storeName" placeholder="請輸入名稱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="電話" prop="storePhone" :label-width="formLabelWidth">
            <el-input v-model="form.storePhone" placeholder="請輸入電話"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="地址" prop="storeAddress" :label-width="formLabelWidth">
            <el-input v-model="form.storeAddress" placeholder="請輸入地址"></el-input>
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
import { validateTelPhone, validateStoreName, validateStoreAddress } from '@/utils/vaildate.js'

export default {
  name: 'motoDF',
  props: {
    dialog: {
      show: Boolean
    },
    form: {
      storeName: String,
      storePhone: String,
      storeAddress: String,
      storeOrder: String,
      status: String
    }
  },
  data () {
    return {
      formLabelWidth: '80px',
      form_rules: {
        storeName: [
          { required: true, validator: validateStoreName, trigger: 'blur' }
        ],
        storePhone: [
          { required: true, validator: validateTelPhone, trigger: 'blur' }
        ],
        storeAddress: [
          { required: true, validator: validateStoreAddress, trigger: 'blur' }
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
          this.$store.dispatch('store/updateStore', this.form)
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

.el-col-12 {
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
