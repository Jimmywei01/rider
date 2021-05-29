<template>
  <div class="footer">
    <div  class="footer-container">
      <div class="foot-join" @click="register">
        <div>加入我們</div>
      </div>
      <div class="foot-exp" @click="home">
        <div>前往體驗</div>
      </div>
      <div>
        <a href="http://github.com/Jimmywei01">關於專案</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    home () {
      this.$router.push('/')
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  width: 100%;
  padding: 20px 0px;
  background-color: #1E2A3B;
}

.footer-container {
  display: flex;
  justify-content: center;
  width: 320px;
  margin: auto;
  color: #fff;
  cursor: pointer;
}

.foot-join ::after{
  content: "|";
  padding:0 10px;
  color: #fff;
}

.foot-exp ::after{
  content: "|";
  padding:0 10px;
  color: #fff;
}
</style>
