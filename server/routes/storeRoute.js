const express = require('express')
const passport = require('passport')
const { storeController } = require('../controllers/storeController')
const router = express.Router()

// 新增、刪除、更新
router.get('/',  storeController.findAll)
router.post('/add', passport.authenticate('jwt', { session: false }), storeController.add)
router.put('/edit/:id',passport.authenticate('jwt', { session: false }),  storeController.edit)
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),  storeController.delete)

module.exports = router