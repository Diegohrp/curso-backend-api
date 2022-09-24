const express = require('express');
const {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  addItemSchema,
} = require('../schemas/orders');
const validateData = require('../middlewares/validate.middlewares');
const OrderService = require('../services/orders');
const service = new OrderService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  const orders = await service.find();
  res.status(200).json(orders);
});

router.get(
  '/:id',
  validateData(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.status(200).json(order);
  }
);

router.post(
  '/',
  validateData(createOrderSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    const order = await service.create(body);
    res.status(201).json(order);
  }
);

router.post(
  '/add-item',
  validateData(addItemSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    const item = await service.addItem(body);
    res.status(201).json(item);
  }
);

module.exports = router;
