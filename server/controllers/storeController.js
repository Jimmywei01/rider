const db = require("../models");
const Store = db.store

storeController = {
  add: async(req, res, next) => {
    const {storeName, storeAddress, storePhone, storeOrder} = req.body
    let checkStorePhone = /^(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d[0-9]$|^09[0-9]{8}$/
    let checkStoreOrder = /^[0-9]*$/

    if(!storeName || !storeAddress || !storePhone){
       return res.status(400).json({status: 'error', message:"缺少必要欄位"})
    }

    if(checkStorePhone.test(storePhone) === false){
      return res.status(400).json({ status: 'error', message: '電話或手機格式錯誤'})
    }

    const duplicate_storeName = await Store.findOne({ where: { storeName } })
      if (duplicate_storeName) {
        return res.status(400).json({ status: 'duplicate_storeName', message: '商店已被註冊' })
      }

    const duplicate_storeAddress = await Store.findOne({ where: { storeAddress } })
      if (duplicate_storeAddress) {
        return res.status(400).json({ status: 'duplicate_storeAddress', message: '地址已被註冊' })
      }

    const duplicate_storePhone = await Store.findOne({ where: { storePhone } })
      if (duplicate_storePhone) {
        return res.status(400).json({ status: 'duplicate_storePhone', message: '電話已被註冊' })
      }

    const newStore = new Store({
      storeName: req.body.storeName,
      storeAddress: req.body.storeAddress,
      storePhone: req.body.storePhone,
      storeOrder: req.body.storeOrder || 0
    })

    newStore.save()
           .then( newMoto => {return res.status(200).json({ status: 'success', message: '新增成功'})})
           .catch( error => {return res.status(500).json({ status: 'error', message: '新增失敗'})})
  },

  findAll: async (req, res, next) => {
    await Store.findAll()
      .then( Store => {
        if(!Store){return res.status(404).json('沒有任何內容')}
        res.status(200).json(Store)
      })
      .catch(err => res.status(404).json(err))
  },

  edit: async (req,res,next) => {
    const {storeName, storeAddress, storePhone, storeOrder} = req.body
    let reqId = Number(req.params.id)
    await Store.findByPk(reqId)
      .then(Store => {
        const StoreFields = {};
        if (storeName) StoreFields.storeName = storeName;
        if (storeAddress) StoreFields.storeAddress = storeAddress;
        if (storePhone) StoreFields.storePhone = storePhone;
        if (storeOrder) StoreFields.storeOrder = storeOrder;
        Store.update(StoreFields)
        res.status(200).json({ status:'success', Store})
      })
      .catch(err => res.status(404).json(err))
  },

  delete: async (req, res) => {
    let reqId = Number(req.params.id)
    await Store.findByPk(reqId)
    .then(Store => {
      Store.destroy(reqId)
      Store.save().then(Store => res.status(200).json({ status:'success', Store}))
    })
    .catch(err => res.status(404).json('刪除失敗'))
  }

}

module.exports = {
  storeController
}