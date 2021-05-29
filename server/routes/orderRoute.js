const express = require('express')
const passport = require('passport')
const { orderController } = require('../controllers/orderController')
const router = express.Router()

/**
  @desc 新增、刪除、更新、過濾
*/
router.get('/', orderController.findAll)
router.post('/add', passport.authenticate('jwt', { session: false }), orderController.add)
router.put('/edit/:id',passport.authenticate('jwt', { session: false }),  orderController.edit)
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),  orderController.delete)

module.exports = router