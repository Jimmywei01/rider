const path = require('path')

module.exports = {
  // configureWebpack: (config)=>{
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //   }
  // },
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    open: true,
    host: 'localhost',
    port: '8082',
    proxy: {
      '/api': {
        // target: 'http://localhost:5001/',
        target: 'https://riderwing.herokuapp.com/',
        changeOrigin: true
      }
    }
  }
}
