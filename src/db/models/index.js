const { User, UserSchema } = require('./users');
const { Customer, CustomerSchema } = require('./customers');
const { Category, CategorySchema } = require('./categories');
const { Product, ProductSchema } = require('./products');
const { Order, OrderSchema } = require('./orders');
const { OrderProduct, OrderProductSchema } = require('./order-product');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  //Relación 1-1
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  //Relación 1-N
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;
