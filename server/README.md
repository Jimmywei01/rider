# server

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run nodeServe
```

### Compiles and minifies for production
```
npm run nodeStar
```

### Heroku for production
```
npm run start
```

### 目錄架構
```sh
├── api                    # 所有請求
├── config                 # 所有設定檔
├── controllers            # 操作資料控制
├── middleware             # 中間件
├── migrations             # ORM
├── model                  # DB table 資料
├── public                 # client 畫面顯示
├── routes                 # server 路由
├── seeders                # migrations 模擬資料
├── index.js               # 入口
├── .env.xxx               # 環境變數配置
├── .gitignore             # git 忽略配置
├── .sequelizerc           # sequelizerc Heroku 檔案連接配置
├── package.json           # package.json
└── README.md             # 規範說明
```
