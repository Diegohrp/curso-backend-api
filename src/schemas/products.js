const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(35);
const price = joi.number().integer().min(10);
const img = joi.string().uri();
const description = joi.string().min(10);
const categoryId = joi.number().integer();

const getProductSchema = joi.object({
  id,
});

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  img: img.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = joi.object({
  name,
  price,
  img,
  description,
  categoryId,
});

module.exports = { getProductSchema, createProductSchema, updateProductSchema };
