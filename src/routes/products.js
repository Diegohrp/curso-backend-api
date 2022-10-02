const express = require('express');
const ProductsService = require('../services/products');
const router = express.Router();
const service = new ProductsService();
const { Op } = require('sequelize');
//Middlewares
const validateData = require('../middlewares/validate.middlewares');
const { verifyApiKey } = require('../middlewares/auth.handler');

//Schemas
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  getProductsSchema,
} = require('../schemas/products');

//Ruta estática
router.get(
  '/',
  verifyApiKey,
  validateData(getProductsSchema, 'query'),
  async (req, res, next) => {
    try {
      const { offset, limit, price_min, price_max } = req.query;
      let where = {};
      if (price_min && price_max) {
        where = {
          price: {
            [Op.gte]: price_min,
            [Op.lte]: price_max,
          },
        };
      }

      const products = await service.find(offset, limit, where);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/filtros', (req, res) => {
  res.json({ name: 'Lámpara', price: 200 });
});
//Ruta dinámica
router.get(
  '/:id',
  validateData(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

//POST
router.post(
  '/',
  validateData(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json(product);
  }
);
//PATCH
router.patch(
  '/:id',
  validateData(getProductSchema, 'params'),
  validateData(updateProductSchema, 'body'),
  (req, res, next) => {
    const body = req.body;
    const update = service.update(req.params.id, body);
    res.json(update);
  }
);
//DELETE
router.delete('/:id', (req, res, next) => {
  const msg = service.delete(req.params.id);
  res.json(msg);
});

module.exports = router;
