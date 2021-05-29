const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('./middleware/passport')
const app = express()
const history = require('connect-history-api-fallback');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// 啟用所有CORS請求
app.use(cors())
// 啟用指定的 url CORS 請求
// let corsOptions = {
//   origin: "http://localhost:8082"
// }
// app.use(cors(corsOptions));

app.set('view engine', 'ejs')
app.use(express.json())
app.use(history())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// 每次進入 passport 驗證時初始化
app.use(passport.initialize())

// 把 routes 給 app 使用（後端 router）
require('./routes')(app)

// production mode 前端路由
if (process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static(__dirname + '/public/'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
