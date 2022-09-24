const joi = require('joi');
const id = joi.number().integer();
const total = joi.number();
const customerId = joi.number().integer();

const createOrderSchema = joi.object({
  total: total.required(),
  customerId: customerId.required(),
});

const getOrderSchema = joi.object({
  id: id.required(),
});

const updateOrderSchema = joi.object({
  total,
  customerId,
});

const addItemSchema = joi.object({
  productId: id.required(),
  amount: total.integer().required(),
  orderId: id.required(),
});

module.exports = {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  addItemSchema,
};
