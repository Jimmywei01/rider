import apiOrder from '@/api/order'

/**
  @desc order 資料結果
  @params
    orders              全部資料
    selectOrders        單一篩選的資料
    undoneNumbers       剩餘數量
    ordersOne           當前 user 的訂單資料
*/
const state = {
  orders: null,
  selectOrders: null,
  undoneNumbers: null,
  ordersOne: []
}

/**
  @desc 操作處理 order 資料
  @method
    SET_ORDER               -> 設定 order 全部資料
    GET_FILTER_ORDERSTATUS  -> 篩選資料狀態
    GET_FILTER_ORDERDATE    -> 篩選日期資料
    GET_FILTER_DATESTATUS   -> 同時篩選狀態＆日期
    GET_HOME_UNDONENUMBERS  -> 前台剩餘數量
    GET_HOME_ORDERONE       -> 前台取得單一 user 資料
    DELETE_ORDER            -> 刪除訂單
*/
const mutations = {
  SET_ORDER: (state, params) => {
    state.orders = params.reverse()
  },
  GET_HOME_UNDONENUMBERS: (state, params) => {
    /*
      initialNumber     初始數量
      orderCarNumbers   當前預約數量
      num               目前預約未還數量
    */
    const initialNumber = Number(params[1])
    const orderCarNumbers = Number(params[2])
    let num = null
    state.orders.forEach(item => {
      if (item.MotoHouse.id === Number(params[0]) && item.orderStatus === '未完成') {
        num += item.orderCarNumbers
      }
    })
    let undoneNumber = initialNumber - orderCarNumbers - num
    if (undoneNumber === 0) {
      undoneNumber = 0
    }
    state.undoneNumbers = undoneNumber
    // console.log('GET_HOME_UNDONENUMBERS:', state.undoneNumbers)
  },
  GET_HOME_ORDERONE: (state, params) => {
    const data = []
    state.orders.forEach(item => {
      if (item.User.id === params) {
        data.push(item)
      }
    })
    state.ordersOne = data
    // console.log('GET_FILTER_ORDERSTATUS:', state.ordersOne)
  },
  GET_FILTER_ORDERSTATUS: (state, params) => {
    const data = []
    let order = {}
    state.orders.forEach(item => {
      if (item.orderStatus === params) {
        order = {
          User: {
            id: item.User.id,
            username: item.User.username,
            phone: item.User.phone
          },
          MotoHouse: {
            id: item.MotoHouse.id,
            motoStore: item.MotoHouse.motoStore,
            motoCatalog: item.MotoHouse.motoCatalog
          },
          orderCarNumbers: item.orderCarNumbers,
          orderLocal: item.orderLocal,
          orderLocalBack: item.orderLocalBack,
          orderCar: item.orderCar,
          orderCarBack: item.orderCarBack,
          orderDate: item.orderDate,
          orderStatus: item.orderStatus,
          id: item.id
        }
        data.push(order)
      }
    })
    state.selectOrders = data
    // console.log('GET_FILTER_ORDERSTATUS:', state.selectOrders)
  },
  GET_FILTER_ORDERDATE: (state, params) => {
    const data = []
    state.orders.forEach(item => {
      if (item.orderDate === params) {
        data.push(item)
      }
    })
    state.selectOrders = data
    // console.log('GET_FILTER_ORDERDATE:', state.selectOrders)
  },
  GET_FILTER_DATESTATUS: (state, params) => {
    const data = []
    state.orders.forEach(item => {
      if (item.orderDate === params[0] && item.orderStatus === params[1]) {
        data.push(item)
      }
    })
    state.selectOrders = data
    // console.log('GET_FILTER_DATESTATUS:', state.selectOrders)
  },
  DELETE_ORDER: (state, params) => {
    const data = []
    state.orderss.forEach(item => {
      if (item.id !== params) {
        data.push(item)
      }
    })
    state.orders = data
    // console.log('DELETE_ORDER:', state.orders)
  }
}

/**
  @desc 打 api
  @method
    getOrder     取得資料
    addOrder     增加資料
    updateOrder  更新 & 編輯 資料
    deleteOrder  刪除資料
*/
const actions = {
  async getOrder ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiOrder.getOrder()
        .then(res => {
          commit('SET_ORDER', res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  async addOrder ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiOrder.addOrder(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  async updateOrder ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiOrder.updateOrder(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  async deleteOrder ({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiOrder.deleteOrder(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
