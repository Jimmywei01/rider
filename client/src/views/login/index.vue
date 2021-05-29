<template>
  <div class="app_container">
    <div class="login">
      <section class="form_container">
        <div class="nav-login">
          <router-link to='/'>
            <img src="../../assets/img/navLogo.svg" class="navLog-block" alt="">
          </router-link>
        </div>
        <div class="area_header">
          <el-row>
            <el-col :span="24">
              <h3>登入</h3>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-form
            :model="loginUser"
            :rules="rules"
            class="loginForm"
            ref="loginForm"
            label-width="0px"
          >
            <el-form-item prop="email">
              <el-input v-model="loginUser.email" placeholder="請輸入電子信箱" type="email"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginUser.password" placeholder="請輸入密碼" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain class="pinkBlue-BoderBtn submit_btn" @click="submitForm('loginForm')">登入</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="area_footer">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12"><p>還沒有帳號？</p></el-col>
            <el-col :span="12" class="loginSet">
              <el-button type="primary"><router-link to='/register'>立即註冊</router-link></el-button>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePass } from '@/utils/vaildate.js'

export default {
  name: 'login',
  data () {
    return {
      value: null,
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.value = valid
          this.$store.dispatch('login/userLogin', this.loginUser)
            .then(res => {
              // 送出 registerForm 之後清除表單資料
              this.$refs[formName].resetFields()
              this.$swal.fire({
                icon: 'success',
                title: '登入成功'
              })
              // 跳轉到 homepage
              this.$router.replace({ path: '/' })
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

<style lang="scss" scoped>
.app_container {
  height: 100%;
}

.nav-login {
  display: flex;
  justify-content: space-around;
  margin: auto;
  width: 100%;
}
.navLog-block {
  display: block;
  margin: 10px;
  width: auto;
  height: 50px;
}

.login {
  margin: auto;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form_container {
  width: 315px;
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 10px #cccc;
}
.area_header {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  margin:0;
}
.loginForm {
  padding: 20px 20px 20px 20px;
}

input::-webkit-input-placeholder {
  color: black;
}

.submit_btn {
  width: 100%;
}

.area_footer {
  border-top: 1px solid #d7d7db;
}

.loginSet{
  margin: 8px;
}
</style>
