const express = require('express');
const productsRouter = require('./products');

function routerAPI(app) {
  const router = express.Router();
  router.use('/products', productsRouter);
  app.use('/api/v1', router);
}

module.exports = routerAPI;
