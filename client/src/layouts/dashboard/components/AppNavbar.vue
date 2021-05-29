<template>
  <div class="navbar">
    <el-header>
      <el-row>
      <el-col :span="12">
        <el-button
          class="toggle-btn"
          icon="el-icon-s-fold"
          type="text"
          @click="toggleAside"
        />
      </el-col>
      <el-col :span="12">
        <div class="right-menu">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img :src='`${user.avatar}`' class='user-avatar' alt="">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to='/'>
                <el-dropdown-item>
                  <span style="display:block;">HomeDesk</span>
                </el-dropdown-item>
              </router-link>
              <router-link to='dashboard'>
                <el-dropdown-item>
                  <span style="display:block;">DashBoard</span>
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block; text-align: center;">Log Out</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppNavbar',
  computed: {
    ...mapGetters(['user'])
  },
  /**
    @method
      logout      登出
      toggleAside 側邊開關
  */
  methods: {
    async logout () {
      await this.$store.dispatch('login/logout')
      this.$router.push('/')
    },
    toggleAside () {
      this.$emit('update:toggle', true)
    }
  }
}
</script>

<style lang="scss" scoped>
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

.navbar {
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  max-width: 1400px;
  .right-menu {
    float: right;
    height: 100%;

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
</style>
