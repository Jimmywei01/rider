<p align="center">
  <a href="https://riderwing.herokuapp.com/">
    <img width="180px" src="./Orange_logo.jpg">
  </a>
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

[中文](./README.zh.md) | English


## Introduction

[Rider](https://github.com/Jimmywei01/rider) is an online platform that allows you to easily subscribe to locomotives，It is based on [vue](https://github.com/vuejs/vue)、[element-ui](https://github.com/ElemeFE/element)、[node.js](https://github.com/nodejs/Release)、[express](https://github.com/expressjs/express)、[mysql2](https://github.com/sidorares/node-mysql2) and [heroku](https://github.com/heroku/cli)

- [Explore Website](https://riderwing.herokuapp.com/)


## Preview

### User Interface
<img src="https://github.com/Jimmywei01/rider/blob/master/user-demo.gif" width="50%">

### Editor Dashboard
<img src="https://github.com/Jimmywei01/rider/blob/master/editor-demo.gif" width="50%">


### Admin Dashboard
<img src="https://github.com/Jimmywei01/rider/blob/master/admin-demo.gif" width="50%">


## User Story
**Front End Homepage**
- User login with different permissions, display the corresponding page & options
- User can edit account information
- User has order information
- User can make reservations according to different models of locomotives, pickup stores, and pickup times

**Front End Dashboard**
- User login with different permissions, display the corresponding page & options
- User can add, edit, delete, query and filter members, orders, locomotives, and stores
- The page can display the current number analysis of members, locomotives, orders, and stores
- The page can display related charts of current members, locomotives, orders, and stores

**Back End**
- Use JSON Web Tokens to add token based authentication to RESTful API
- Image upload function using Imgur API
- Use bcrypt for encryption
- Use sequelize for ORM to add, edit, delete, and query Mysql operations

**Platform**
- Use gitHub version control and automatically deploy to Heroku


## Features
**Front End**
- Sign in
- Register
- vuex data management
- vue-router dynamic routing
- ECharts 
- Permission Validation
- Dashboard

**Back End**
- JWT
- ORM operation
- Mysql 
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
This will automatically open：http://localhost:8082/

### Build
```
npm run build
```
