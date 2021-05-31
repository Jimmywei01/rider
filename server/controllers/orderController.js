
const moment = require('moment')
const db = require("../models")
const User = db.user
const Store = db.store
const Motohouse = db.motohouse
const Order = db.order
const OrderItem = db.orderitem

// 在 contorller 裡面設定關聯
User.hasMany(Order)
Motohouse.hasMany(Order)
Store.hasMany(Order)
OrderItem.hasOne(Order)
Order.belongsTo(User, {foreignKey: 'UserId'})
Order.belongsTo(Motohouse, {foreignKey: 'MotoHouseId'})
Order.belongsTo(Store, {foreignKey: 'StoreId'})
Order.belongsTo(OrderItem)
/**
  @desc
    修改訂單狀態
    刪除訂單
    訂單狀態搜尋
    訂單日期搜尋
*/
orderController = {
  /**
  @desc 新增 order ＆ 同時發送 addOrder addOrderItem
  @params
    motoStore        -> 車廠
    motoCatalog      -> 車款
    orderCarNumbers  -> 數量
    orderLocal       -> 取車點
    orderLocalBack   -> 還車點
    orderCar         -> 取車日期
    orderCarBack     -> 還車日期
    orderDate        -> 當天訂單日期
    orderStatus      -> 訂單狀態
    UserId、MotoHouseId、storeId  -> 代表在 Vue select 選到的資料 id
  */
  add: async(req, res, next) => {
    let Today = new Date()
    let newTody = moment(Today).format("yyyy-MM-DD")
    const {motoStore, motoCatalog, orderCarNumbers, orderLocal, orderLocalBack, orderCar, orderCarBack, orderDate, orderStatus, UserId, MotoHouseId, StoreId} = req.body
    let checkNumbers = /^[0-9]*$/
    if(!orderCarNumbers || !orderLocal || !orderLocalBack || !orderCar || !orderCarBack){
      return res.status(400).json({status: 'error', message:"缺少必要欄位"})
    }

    if(checkNumbers.test(orderCarNumbers) === false){
    return res.status(400).json({ status: 'error', message: '請輸入數字'})
    }

    if(orderCarNumbers <= 0){
      return res.status(400).json({ status: 'error', message: '請重新輸入'})
    }

    if(orderCar < newTody || orderCarBack < newTody) {
      return res.status(400).json({ status: 'error', message: '請重新選擇日期'})
    }

    if(orderCar > orderCarBack ) {
      return res.status(400).json({ status: 'error', message: '還車日期不得小於取車日期，請重新選擇'})
    }

    /*
      用 orderLocal 找轉換給 order 的 StoreId -> 取得當前輸入的 store 資料
    */
    let store = await Store.findAll({
      where: {
        storeName: orderLocal
      }
    })

    /*
      用 motoCatalog 轉換給 order 的 motoHouseId -> 取得當前輸入的 moto 資料
    */
    let motoHouse = await Motohouse.findAll({
      where: {
        motoCatalog: motoCatalog
      }
    })

    /*
    撈出未完成數量
    用 OrderItem 關聯撈出 -> 計算 未完成＆對應 motoHouseId 的數量
    */
    let oldOrderItem = await OrderItem.findAll({
      where: {
        MotoHouseId: motoHouse[0].id,
        orderItemStatus: '未完成'
      }
    })

    /*
      計算未完成的數量
      把 oldOrderItem 數量做加總
    */
    function sumOldNumber() {
      let num = 0
      oldOrderItem.forEach((item, index, array) => {
        num += array[index].commentNumber
      })
      return num
    }
    let oldNumberSum = sumOldNumber()

    // 目前總和 = 未完成數量 + 當前傳進來的數量
    let sumCommentNumber = oldNumberSum + Number(orderCarNumbers)

    // 判斷 user 輸入的車款數量 -> 初始設定量 > 總和數量
    if (motoHouse[0].numbers >= sumCommentNumber) {
      // 儲存訂單
      await addOrder()
      // Store 訂單數量 + 1
      await newStoreOrder()
      // 把 OrderItemId 賦予給 Order
      await updateOrderId()
    } else {
      res.status(404).json({ status: 'error', message: '超出可預訂數量' })
    }

    async function addOrder() {
      const newOrder = await new Order({
        orderCarNumbers: req.body.orderCarNumbers,
        orderLocal: req.body.orderLocal,
        orderLocalBack: req.body.orderLocalBack,
        orderCar: req.body.orderCar,
        orderCarBack: req.body.orderCarBack,
        orderDate: newTody,
        orderStatus: req.body.orderStatus || '未完成',
        UserId: req.body.UserId,
        MotoHouseId: motoHouse[0].id,
        StoreId: store[0].id,
        OrderItemId: req.body.id
      })

      await newOrder.save()
           .then( newOrder => {return res.status(200).json({ status: 'success', message: '新增成功'})})
           .then(res => {
            // 新增 storeItem db 資料
              if (res.statusCode === 200) {
                const newOrderItem = new OrderItem({
                  commentNumber:newOrder.orderCarNumbers,
                  orderItemStatus: newOrder.orderStatus,
                  MotoHouseId: newOrder.MotoHouseId,
                  StoreId: newOrder.StoreId,
                  OrderId: newOrder.id
                }).save()
              }
            })
            .catch( error => {return res.status(500).json({ status: 'error', message: '新增失敗'})})
    }

    async function newStoreOrder () {
      // 找到對應的 store 更新 storeOrder +1
      await Store.findByPk(store[0].id)
        .then(Store => {
          Store.update({
            storeOrder: Store.storeOrder+1
          })
        })
    }

    async function updateOrderId () {
      let order = await Order.findAll({
         order: [ ['id', 'DESC'] ],
         limit: 1
      })
      let newOrder = order[0]

      let orderItem = await OrderItem.findAll({
         order: [ ['id', 'DESC'] ],
         limit: 1
      })
      let newOrderItem = orderItem[0]

      await Order.findByPk(newOrder.id)
        .then(Order => {
          Order.update({
            OrderItemId: newOrderItem.id
          })
        })
    }
  },


  /**
  @desc 取得對應 user 的 order 訂單
    前台  -> user 的訂單內容，用 UserId 帶出他自己的訂單
    後台  ->  用 UserId、MotoHouseId、StoreId 關聯資料回傳
  */
  findAll: async (req, res, next) => {
    function getAllMessage(){
      return new Promise((resolve,reject)=>{
        const options = {
          order:['id'], //默認升序規則
          attributes:['id','orderCarNumbers','orderLocal','orderLocalBack','orderCar','orderCarBack','orderDate','orderStatus'],// order 的欄位
          // 關聯 table
          include:[
            {
              model:User,
              attributes:['id','username','email','phone'],
            },
            {
              model:Motohouse,
              attributes:['id','motoStore','motoCatalog','numbers'],
            },
            {
              model:Store,
              attributes:['id','storeName'],
            }
          ]
        };
        Order.findAll(options)
        .then((order) => {
          resolve(order);
        })
        .catch((err)=>{
          reject(err);
        })
      })
    }
// 執行
  getAllMessage()
    .then((order)=>{
      res.json([...order])
    })
    .catch((err)=>{
      console.error(err);
    })
  },

  edit: async(req, res, next) => {
    const {orderCarNumbers, orderStatus, UserId, MotoHouseId, StoreId} = req.body
    let reqId = Number(req.params.id)
    /*
    撈出未完成數量
    用 OrderItem 關聯撈出 -> 計算 未完成＆對應 motoHouseId 的數量
    */
    let oldOrderItem = await OrderItem.findAll({
      where: {
        MotoHouseId: MotoHouseId,
        orderItemStatus: '未完成'
      }
    })
    /*
    計算未完成的數量
    把 oldOrderItem 數量做加總
    */
    function sumOldNumber() {
      let num = 0
      oldOrderItem.forEach((item, index, array) => {
        num += array[index].commentNumber
      })
      return num
    }
    let oldNumberSum = sumOldNumber()
    //  目前總和 = 未完成數量 + 當前傳進來的數量
    let sumCommentNumber = oldNumberSum + Number(orderCarNumbers)

    // 當下編輯要使用 motoHouse 的 motoHouseNumbers
    let motoHouse = await Motohouse.findByPk(MotoHouseId)
    let motoHouseNumbers = motoHouse.numbers

    // 判斷 初始設定量 > 總和數量
    if (motoHouseNumbers > sumCommentNumber) {
      await updateOrder()
      await updateOrderItem()
    } else {
      res.status(404).json({ status: 'error', message: '超出可預訂數量' })
    }

    // 更新 Order
    async function updateOrder() {
      await Order.findByPk(reqId)
      .then(Order => {
        const OrderFields = {}
        if (orderCarNumbers) OrderFields.orderCarNumbers = orderCarNumbers
        if (orderStatus) OrderFields.orderStatus = orderStatus
        if (UserId) OrderFields.UserId = UserId
        if (MotoHouseId) OrderFields.MotoHouseId = MotoHouseId
        if (StoreId) OrderFields.StoreId = StoreId
        Order.update(OrderFields)
        res.status(200).json({ status:'success', Order})
      })
      .catch(err => res.status(404).json(err))
    }
    // 更新 OrderItem
    // 先取要更新的 OrderId
    async function updateOrderItem() {
      // 要用 orderItemId
      let order = await Order.findByPk(reqId)
      await OrderItem.findByPk(order.OrderItemId)
      .then(OrderItem => {
        const option = {
          commentNumber: orderCarNumbers,
          orderItemStatus: orderStatus
        }
         OrderItem.update(option)
      })
    }
  },

  delete: async (req, res, next) => {
    let reqId = Number(req.params.id)
    await Order.findByPk(reqId)
    .then(Order => {
      Order.destroy(reqId)
      Order.save().then(Order => res.status(200).json({ status:'success', Order}))
    })
    .catch(err => res.status(404).json('刪除失敗'))

    let delorder = await OrderItem.findOne({
      where:{OrderId:reqId}
    })

    await Store.findByPk(delorder.MotoHouseId)
      .then(Store => {
        Store.update({
            storeOrder: Store.storeOrder-1
          })
      })

    await OrderItem.destroy({
      where: {
        OrderId: reqId
      }
    })
  }
}

module.exports = {
  orderController
}