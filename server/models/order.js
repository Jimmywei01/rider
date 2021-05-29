'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    orderCarNumbers: DataTypes.INTEGER,
    orderLocal: DataTypes.STRING,
    orderLocalBack: DataTypes.STRING,
    orderCar: DataTypes.STRING,
    orderCarBack: DataTypes.STRING,
    orderDate: DataTypes.STRING,
    orderStatus: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    MotoHouseId: DataTypes.INTEGER,
    StoreId: DataTypes.INTEGER,
    OrderItemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};