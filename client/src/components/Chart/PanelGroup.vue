<template>
  <el-row :gutter="24" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-user"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            會員
          </div>
          <count-to :start-val="0" :end-val="memberNumber" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-bicycle">
          <i class="el-icon-bicycle"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            車款
          </div>
          <count-to :start-val="0" :end-val="motoNumber" :duration="3500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-tickets"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            訂單
          </div>
          <count-to :start-val="0" :end-val="orderNumber" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-school"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            商店
          </div>
          <count-to :start-val="0" :end-val="storeNumber" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data () {
    return {
      memberNumber: null,
      motoNumber: null,
      orderNumber: null,
      storeNumber: null
    }
  },
  mounted () {
    this.getElementData()
  },
  /**
    @method
      getElementData    得到相關資料
  */
  methods: {
    getElementData () {
      const member = this.$store.getters.members
      const moto = this.$store.getters.motos
      const order = this.$store.getters.orders
      const store = this.$store.getters.stores

      Promise.all([member, moto, order, store]).then(value => {
        this.memberNumber = value[0].length || 0
        this.motoNumber = value[1].length || 0
        this.orderNumber = value[2].length || 0
        this.storeNumber = value[3].length || 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-bicycle {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
      font-size: 45px;
    }

    .icon-bicycle {
      color: #36a3f7;
      font-size: 45px;
    }

    .icon-money {
      color: #f4516c;
      font-size: 45px;
    }

    .icon-shopping {
      color: #34bfa3;
      font-size: 45px;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
}
</style>
