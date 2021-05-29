<template>
  <div class="home">
    <div class="container">
          <div class="header-container">
            <div class="header-Text">
              <h1>想騎車？</h1>
              <h2>賦予你一輛自由的翅膀</h2>
            </div>
            <div class="header-Img"></div>
          </div>
      <section>
        <div class="process-container">
          <div class="process-header">
            <h2>人人有車騎</h2>
            <p>預約三步驟</p>
          </div>
          <div class="process-step">
            <el-row :gutter="12">
              <el-col :xs="8" :sm="8" :lg="8">
                <div class="process">
                  <img src="../../assets/img/scooter.svg" alt="" class="step-moto">
                  <h3>選機車</h3>
                </div>
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                <div>
                  <img src="../../assets/img/clock.svg" alt="" class="step-time">
                  <h3>選時段</h3>
                </div>
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                <div>
                  <img src="../../assets/img/location.svg" alt="" class="step-local">
                  <h3>選地點</h3>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </section>
      <section>
        <div class="product-container">
          <div class="product-title">
            <h2>熱門機車</h2>
            <div class="product-goMoto">
              <el-button type="text">
                <router-link to='moto'>更多熱門機車
                  <i class="el-icon-right"></i>
                </router-link>
              </el-button>
            </div>
          </div>
          <Product/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Product from '../../components/Product/index'
export default {
  name: 'HomePage',
  components: {
    Product
  }
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  box-sizing : border-box;
}

.header-container {
  height: 600px;
}

.header-Text {
  position: relative;
  margin-top: -125px;
  top: 25%;
  text-align: center;
  width: 100%;
  text-shadow: 1px 1px 1px #636161;
  color: white;
  z-index: 1005;
}

.header-Img {
  background-image: url("../../assets/img/pexels-pixabay2.jpg");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  min-height: 100%;
  opacity: 0.9;
}

.process-container {
  padding: 50px;
  display: block;
  margin-bottom: 50px;
  text-align: center;
  background-color: #fff;
}

.process-header p {
  margin-bottom: 50px;
  font-weight: 500;
}
.process-step {
  max-width: 1200px;
  margin: 0 auto;
  .step-moto {
    width: 50px;
  }

  .step-time {
    width: 50px;
  }

  .step-local {
    width: 50px;
  }
}

.product-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

.product-title {
  display: flex;
  justify-content: space-between;
  .product-goMoto {
    font-weight: bold;
    line-height: 70px;
    text-shadow: 1px 1px 1px #636161;
  }
}

</style>
