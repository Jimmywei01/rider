const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const db = require("../models");
const jwt = require('jsonwebtoken')
const key = require('../config/auth.config')
const passport = require('passport')
const imgurAPI = require('../api/axios')
const User = db.user
const saltRounds = 10
const EXPIRES_IN = 300 * 1000


userController = {
/**
@desc User 註冊
  檢查 User 有無輸入資料（username、 password、email）
  檢查 email 格式有無錯誤
  檢查 password 格式有無錯誤
  從 DB 查詢有無相同 userName、 email
  都無錯誤建立 user 資料（username、 password、email、avatar）到 DB table
*/
  handleRegister: async (req, res, next) => {
    const {username, password, email, phone} = req.body
    let checkPhone = /^09[0-9]{8}$/
    let checkEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let checkPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/

    if(!username || !password || !email || !phone){
       return res.status(400).json({status: 'error', message:"缺少必要欄位"})
    }

    if (password.length < 8 || password.length > 12) {
      return res.status(400).json({ status: 'error', message: '密碼長度需在 8-12' })
    }

    if(checkPassword.test(password) === false){
      return res.status(400).json({status:'error', message:'密碼需同時含有數字和字母'})
    }

    if(checkEmail.test(email) === false){
      return res.status(400).json({ status: 'error', message: 'Email 格式錯誤'})
    }

    if(checkPhone.test(phone) === false){
      return res.status(400).json({ status: 'error', message: ' 手機格式錯誤'})
    }

    const duplicate_username = await User.findOne({ where: { username } })
      if (duplicate_username) {
        return res.status(400).json({ status: 'duplicate_username', message: '使用者已被註冊' })
      }

    const duplicate_email = await User.findOne({ where: { email } })
      if (duplicate_email) {
        return res.status(400).json({ status: 'duplicate_email', message: 'Email 已被註冊' })
      }

    const duplicate_phone = await User.findOne({ where: { phone } })
      if (duplicate_phone) {
        return res.status(400).json({ status: 'duplicate_phone', message: '電話已被註冊' })
      }

  // 新建 user
      try {
      // 頭像
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          avatar:`https:${avatar}`,
          password: req.body.password,
          identity:req.body.identity,
          phone:req.body.phone
        })

        // 加密密碼，不會在頁面＆DB上顯示明碼，hash 加密
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
            // 先判斷有無錯誤
              if(err) throw err
              newUser.password = hash
              newUser
                .save()
                .then( user => {return res.status(200).json({ status: 'success', message: '註冊成功'})})
                .catch( error => {return res.status(500).json({ status: 'error', message: '伺服器問題'})})
            })
          })
      } catch (error) {
         return res.status(500).json({status: 'error', message: error })
      }
  },

/**
@desc User 登入
  檢查 User 有無輸入資料（username、 password）
  從 DB 判斷 username 有無輸入錯誤
  從 DB 判斷 password 有無輸入錯誤
  若 password 輸入正確回傳 token jwt passport
*/
  handleLogin: async (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({status: 'error', message: '缺少必要欄位'})
    }

    User.findOne({ where: { email } })
      .then( (user) => {
        if(!user){
          return res.status(400).json({ status: 'error', message: '使用者不存在' })
        }
  // 輸入的加密密碼與資料庫加密密碼比對
        bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch){
  // jwt.sign(規則(自定義給jwt轉換),加密(自定義給jwt加密),過期時間(自定義),cb)
            const role = {
              id:user.id,
              name:user.username,
              identity: user.identity,
              phone:user.phone,
              avatar:user.avatar
            }
            const token = jwt.sign(role,key.screat,{ expiresIn: EXPIRES_IN })
            // https 增加使用 'secure'
            res.cookie('token', token, { maxAge: EXPIRES_IN, httpOnly: false, secure: true})
            // http 可用
            // res.cookie('token', token, { maxAge: EXPIRES_IN, httpOnly: true })
            res.json({
              status:'success',
              token: token
            })
          } else {
            return res.status(400).json({ status: 'error', message: '信箱或密碼輸入錯誤' })
          }
        })
      })
  },

/**
  @desc 登出
*/
  logout: (req, res) => {
    return res.json({
      id: null,
      username: null,
      email: null,
      identity: null,
      phone: null
    })
  },

/**
  @desc 取全部會員資料
*/
  findAll: async (req, res) => {
    await User.findAll()
      .then( User => {
        if(!User){return res.status(404).json('沒有任何內容')}
        res.status(200).json(User)
      })
      .catch(err => res.status(404).json(err))
  },

/**
  @desc 編輯更新資料
*/
  edit: async (req,res,next) => {
    const {avatar, username, identity, email, phone, flag} = req.body
    let reqId = Number(req.params.id)

    /**
      1.avatar 進來要先判斷
      2.flag 判斷是從哪個平台過來
      因為 el-update 設定不保留檔案，當 update 非 avatar 資料時 avatar req 會回傳'空值'
      所以用 db 內的 avatar & req 值進行判斷
    */
    let imgurLink = ''
    let dbAvatar = ''

    await User.findByPk(reqId).then(User => {
        dbAvatar = User.avatar
    })
    if (flag === 'homeDesk') {
      if (avatar.length === '') {
        imgurLink = dbAvatar
      } else if(dbAvatar === avatar){
        imgurLink = dbAvatar
      } else if(dbAvatar !== avatar){
        imgurLink = await imgurAPI(avatar)
      }
    }
    await User.findByPk(reqId)
      .then(User => {
        const UserFields = {};
        if (avatar) UserFields.avatar = imgurLink;
        if (username) UserFields.username = username;
        if (identity) UserFields.identity = identity;
        if (email) UserFields.email = email;
        if (phone) UserFields.phone = phone;
        User.update(UserFields)
        res.status(200).json({ status:'success', User})
      })
      .catch(err => res.status(404).json(err))
  },

/**
  @desc 刪除單一資料
    destroy 異步銷毀（sequelize）
*/
  delete: async (req, res) => {
    let reqId = Number(req.params.id)
    await User.findByPk(reqId)
    .then(User => {
      User.destroy(reqId)
      User.save().then(User => res.status(200).json({ status:'success', User}))
    })
    .catch(err => res.status(404).json('刪除失敗'))
  }
}

allAccess=(req, res) => {
  res.status(200).send("登入成功");
}

module.exports = {
  allAccess,
  userController
}