const { User, UserSchema } = require('./users');
const { Customer, CustomerSchema } = require('./customers');
const { Category, CategorySchema } = require('./categories');
const { Product, ProductSchema } = require('./products');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  //Relación 1-1
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  //Relación 1-N
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
