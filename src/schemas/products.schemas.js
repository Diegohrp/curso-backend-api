const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(35);
const price = joi.number().integer().min(10);
const img = joi.string().uri();

const getProductSchema = joi.object({
  id,
});

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  img: img.required(),
});

const updateProductSchema = joi.object({
  name,
  price,
  img,
});

module.exports = { getProductSchema, createProductSchema, updateProductSchema };
