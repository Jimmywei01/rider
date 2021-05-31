<p align="center">
  <img width="180px" src="./Orange_logo.jpg">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.15.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/apache/echarts">
    <img src="https://img.shields.io/badge/echarts-5.1.0-brightgreen" alt="echarts">
  </a>
  <a href="https://github.com/axios/axios">
    <img src="https://img.shields.io/badge/axios-0.21.1-brightgreen" alt="axios">
  </a>
  <a href="https://github.com/nodejs/Release">
    <img src="https://img.shields.io/badge/node.js-12.x-brightgreen" alt="node.js">
  </a>
  <a href="https://github.com/expressjs/express">
    <img src="https://img.shields.io/badge/express-4.17.1-brightgreen" alt="express">
  </a>
  <a href="https://github.com/sidorares/node-mysql2">
    <img src="https://img.shields.io/badge/mysql2-2.2.5-brightgreen" alt="mysql2">
  </a>
</p>

中文 | [English](./README.md)


## 簡介

[Rider](https://github.com/Jimmywei01/rider) 是一個前后台練習專案，可讓您輕鬆預訂機車的線上平台，它基于 [vue](https://github.com/vuejs/vue)、[element-ui](https://github.com/ElemeFE/element)、[node.js](https://github.com/nodejs/Release)、[express](https://github.com/expressjs/express)、[mysql2](https://github.com/sidorares/node-mysql2) 和 [heroku](https://github.com/heroku/cli)實現。

- [在線預覽](https://riderwing.herokuapp.com/)


## 預覽

### User Interface
<img src="https://github.com/Jimmywei01/rider/blob/master/user-demo.gif" width="50%">

### Editor Dashboard
<img src="https://github.com/Jimmywei01/rider/blob/master/editor-demo.gif" width="50%">


### Admin Dashboard
<img src="https://github.com/Jimmywei01/rider/blob/master/admin-demo.gif" width="50%">


## User Story
**前端 Homepage**
- User 依照不同權限登入，顯示對應頁面＆選項
- User 可以對帳戶資料進行編輯
- User 可以看到訂單資料
- User 可以依照不同車款機車、取車商店、時間進行預定

**前端 Dashboard**
- User 依照不同權限登入，顯示對應頁面＆選項
- User 可以對會員、訂單、車款、商店進行新增、修改、刪除、查詢篩選
- 頁面可以顯示目前會員、機車車款、訂單、商店的數量分析
- 頁面可以顯示目前會員、機車車款、訂單、商店的相關圖表

**後端**
- 使用 JSON Web Tokens 對 RESTful API 進行驗證
- 使用 Imgur API 進行圖片上傳功能
- 使用 bcrypt 進行加密
- 使用 sequelize 進行 ORM 對 Mysql 操作新增、修改、刪除、查詢

**平台**
- 使用 gitHub 版控並自動部署至 Heroku 顯示頁面


## 功能
**前端**
- 登入
- 註冊
- vuex 資料管理
- vue-router 動態路由
- ECharts 圖表
- 權限驗證
- Dashboard

**後端**
- JWT
- ORM 操作
- Mysql 串接
- RESTful API
- Imgur API


## Getting started

**User**
- Log in
  - email: user@gmail.com
  - password: 123123qwe

**Editor**
- Log in
  - email: editor@gmail.com
  - password: 123123qwe

**Admin**
- Log in
  - email: admin@gmail.com
  - password: 123123qwe

### Develop
```
# clone the project
git clone git@github.com:Jimmywei01/rider.git

# enter the project directory
cd rider
cd client

# install dependency
npm install

# develop client
npm run server

# develop server
npm run nodeServer
```
瀏覽器：http://localhost:8082/

### Build
```
npm run build
```
