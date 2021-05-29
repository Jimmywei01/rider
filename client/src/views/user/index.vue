<template>
  <div
  class="container"
  v-loading="loading"
  element-loading-text="加载中"
  element-loading-background="rgba(239, 239, 239, 0.8)">
    <HomeSide :newForm='newForm'/>
    <div class="user-box">
      <el-form
      :model="form"
      :rules="form_rules"
      ref="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="username" placeholder="請輸入性名">
            <el-input v-model="form.username" class="boxInput-name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="電話" prop='phone'>
            <el-input v-model="form.phone" placeholder="請輸入電話" type="phone" class="boxInput-phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="請輸入電子信箱" type="email" style="width: 15rem;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="updateImage">
          <el-form-item label="圖片">
            <el-col :span="24">
              <el-upload
                ref="upload"
                :multiple="false"
                :limit=1
                action
                :auto-upload="false"
                :on-change="getFile"
                :before-upload="beforeAvatarUpload"
                list-type="picture-card"
              >
              <el-button size="small" type="primary">
                Click upload
              </el-button>
              </el-upload>
            </el-col>
           </el-form-item>
           <p>頭像儲存後，您可能需要重新登入，查看最新的頭像效果</p>
        </el-row>
     </el-form>
     <div class="box-footer">
      <el-button type="primary" @click="submit('form')">更新</el-button>
     </div>
    </div>
  </div>
</template>

<script>
import HomeSide from '../../components/HomeSide/index'
import { validateName, validateEmail, validatePhone } from '@/utils/vaildate.js'

export default {
  name: 'User',
  components: {
    HomeSide
  },
  data () {
    return {
      userId: null,
      form: {
        username: '',
        email: '',
        avatar: '',
        phone: ''
      },
      form_rules: {
        username: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ]
      },
      newForm: null,
      loading: null
    }
  },
  created () {
    this.userData()
  },
  /**
    @method
      userData             user 顯示的資訊
      getFile              得到 <el-update> 要上傳的資料
      getBase64            轉換圖片為 base64
      beforeAvatarUpload   圖片上傳前的限制規則
      submit               發送資料
  */
  methods: {
    getLoading (value) {
      this.loading = value
    },
    async userData () {
      await this.$store.dispatch('member/getMembers')
      this.userId = this.$store.getters.user.id
      await this.$store.commit('member/SET_HOME_MEMBER', this.userId)
      this.form = this.$store.getters.memberOne
    },
    async getFile (file) {
      this.getBase64(file).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.form.avatar = params[1]
        }
      })
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        // 讀取內容，結果用 data:url 顯示
        reader.readAsDataURL(file.raw)
        // 用 onload 因為轉換需要時間
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    // 對上傳圖片的大小，格式進行限制
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG && !isJPG2 && !isPNG) {
        this.$message.warning('只支持jpg或png格式圖片')
      }
      if (!isLt1M) {
        this.$message.warning('請上傳1MB以內的圖片！')
      }
      return (isJPG || isJPG2 || isPNG) && isLt1M
    },
    submit (form) {
      this.form.flag = 'homeDesk'
      this.$refs[form].validate((valid) => {
        // 清空更新值避免 HomeSide watch 不會觸發
        this.newForm = ''
        if (valid) {
          this.loading = true
          this.$store.dispatch('member/updateMember', this.form)
            .then(res => {
              this.loading = false
              this.$swal.fire({
                icon: 'success',
                title: '修改成功'
              }).then(res => {
                // 上傳圖片後清空
                this.$refs.upload.clearFiles()
                this.newForm = 'updateForm'
              })
              this.userData()
            })
            .catch(error => {
              this.loading = false
              if (error.data) {
                this.$swal.fire({
                  icon: 'error',
                  title: error.data.message || '連線有問題'
                })
              }
            })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

.container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0px auto;
}

.user-box {
  margin-top: 35px;
  width: 450px;
  border: 1px solid #fff;
  background: #fff;
  box-shadow: 0px 2px 10px #cccc;
  padding: 15px;
}

.el-form-item .el-input {
    width: 10rem;
  }

.box-footer {
  text-align: center;
}

@media screen and (max-width: 320px) {
.el-form-item .boxInput-name {
    width: 8rem;
  }

.el-form-item .boxInput-phone {
    width: 8rem;
  }
}

</style>
