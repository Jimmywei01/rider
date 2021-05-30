# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint-fix
```

### 目錄架構
```sh
├── public                     # 靜態資源
│   ├── index.html             # html 模板
│   └── logo2.png              # icon
├── src                        # 原始碼
│   ├── api                    # 所有請求
│   ├── assets                 # 主題,字體等靜態資源
│   ├── components             # 全局公用组件
│   ├── database               # 全局公用資料庫
│   ├── directive              # 全局指令
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── styles                 # 全局樣式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有頁面
│   ├── App.vue                # 入口頁面
│   └── main.js                # 入口文件 加載组件 初始化等
├── .browserslistrc            # 瀏覽器兼容性配置
├── .editorconfig              # 編碼樣式的文件格式配置
├── .env.xxx                   # 環境變數配置
├── .eslintrc.js               # eslint 配置
├── .gitignore                 # git 忽略配置
├── babel.config.js            # babel 配置
├── package.json               # package.json
├── README.md                  # 規範說明
└── vue.config.js              # vue-cli 配置
```
