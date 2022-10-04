const express = require('express');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const orderRouter = require('./orders');
const customersRouter = require('./customers');
const authRouter = require('./auth');
const profileRouter = require('./profile');

function routerAPI(app) {
  const router = express.Router();
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  app.use('/api/v1', router);
}

module.exports = routerAPI;
