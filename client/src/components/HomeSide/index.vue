<template>
  <div class="homeSide">
    <div class="container">
      <div class="box-avatar">
        <img :src='`${form.avatar}`' ref="main" class='user-avatar' alt="">
        <p>{{form.username}}</p>
      </div>
      <div class="box-option">
        <div v-if="this.identity !== 'user'" @click="dashboard">後台管理</div>
        <div @click="userInfo">帳戶設定</div>
        <div @click="userOrder">訂單管理</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

/**
  @desc user 側邊資訊欄
*/
export default {
  name: 'HomeSide',
  data () {
    return {
      identity: '',
      userId: null,
      form: {}
    }
  },
  props: {
    newForm: { type: String }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    this.checkIdentity()
  },
  watch: {
    async newForm (value) {
      await this.$store.dispatch('member/getMembers')
      await this.$store.commit('member/SET_HOME_MEMBER', this.userId)
      this.form = await this.$store.getters.memberOne
    }
  },
  /**
    @method
      checkIdentity    判斷權限顯示相關欄位，並重新取得資料
  */
  methods: {
    async checkIdentity () {
      await this.$store.dispatch('member/getMembers')
      this.identity = this.user.identity
      this.userId = this.user.id
      await this.$store.commit('member/SET_HOME_MEMBER', this.userId)
      this.form = await this.$store.getters.memberOne
    },
    dashboard () {
      this.$router.push('/dashboard')
    },
    userInfo () {
      this.$router.push('/user')
    },
    userOrder () {
      this.$router.push({
        path: `/userOrder/${this.userId}`
      })
    }
  }
}
</script>

<style lang='scss' scoped>

.container {
  position: relative;
  max-width: 250px;
  border: 1px solid #fff;
  box-shadow: 0px 2px 10px #cccc;
  margin: 35px 15px;
}

.box-avatar {
  background-color: #01B8AE;
  padding: 15px;
  width: 250px;
  text-align: center;
  .user-avatar {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }
  p {
    text-align: center;
  }
}

.box-option {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 250px;
  text-align: center;
  line-height: none;
  cursor: pointer;
  div {
    padding: 15px;
  }
  div:hover {
    background-color: #cccc;
  }
}

</style>
