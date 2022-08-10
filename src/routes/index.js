const express = require('express');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const orderRouter = require('./orders');

function routerAPI(app) {
  const router = express.Router();
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  app.use('/api/v1', router);
}

module.exports = routerAPI;
