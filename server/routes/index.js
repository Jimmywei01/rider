const userRoute = require('./userRoute')
const motohouseRoute = require('./motohouseRoute')
const storeRoute = require('./storeRoute')
const orderRoute = require('./orderRoute')

module.exports = (app) => {
  app.use('/api/users', userRoute)
  app.use('/api/moto', motohouseRoute)
  app.use('/api/store', storeRoute)
  app.use('/api/order', orderRoute)
}