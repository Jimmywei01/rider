<template>
  <div class="navbar">
    <div class="container">
      <div>
        <img src="../../../assets/img/navLogo.svg" class="navLog-block" alt="" @click="home">
      </div>
      <div>
        <div class="right-menuSign" v-if="this.checkUser === 'false'">
          <div class="right-login">
              <el-button size='small' @click="loging(), goLogin()" >登入</el-button>
          </div>
          <div class="right-register">
              <el-button type="warning" size='small' @click="goRegister()">註冊</el-button>
          </div>
        </div>
        <div class="right-menu" v-if="this.checkUser === 'true'">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img :src='`${user.avatar}`' class='user-avatar' alt="">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu>
                <div @click="userInfo">
                  <el-dropdown-item >
                    <span style="display:block;" >帳戶設定</span>
                  </el-dropdown-item>
                </div>
                <div @click="userOrder">
                  <el-dropdown-item>
                    <span style="display:block;" >訂單管理</span>
                  </el-dropdown-item>
                </div>
                <div v-if="this.identity !== 'user'" @click="dashboard">
                  <el-dropdown-item >
                    <span style="display:block;" >後台管理</span>
                  </el-dropdown-item>
                </div>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">帳號登出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppNavbar',
  data () {
    return {
      checkUser: null,
      identity: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  /**
    @method
      loging     判斷有無登入＆取得 user 權限
      logout     登出
      userOrder  跳轉到當前登入 user 的 order
  */
  methods: {
    loging () {
      this.checkUser = this.$store.getters.user.id ? 'true' : 'false'
      this.identity = this.$store.getters.user.identity
    },
    logout () {
      this.$store.dispatch('login/logout')
      this.$router.push('/')
    },
    home () {
      this.$router.push('/')
    },
    userInfo () {
      this.$router.push('/user')
    },
    userOrder () {
      this.$router.push({
        path: `/userOrder/${this.$store.getters.user.id}`
      })
    },
    dashboard () {
      this.$router.push('/dashboard')
    },
    goLogin () {
      this.$router.push('/login')
    },
    goRegister () {
      this.$router.push('/register')
    }
  },
  created () {
    this.loging()
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1008;
  background: #fff;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);

  .right-menu {
    float: right;
    margin: 10px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.toggle-btn {
  line-height: 2px;
  padding: 2 1.5rem;
  color: #606266;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #606266;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 1200px;
  width: 100%;
}
.navLog-block {
  display: block;
  margin: 10px;
  width: auto;
  height: 50px;
  cursor: pointer;
}

.right-menuSign {
  display: flex;
  line-height: 4.5rem;
}

.right-login {
  padding-right:10px;
}

</style>
