const express = require('express');
const ProductsService = require('../services/products');
const router = express.Router();
const service = new ProductsService();

//Middlewares
const validateData = require('../middlewares/validate.middlewares');
//Schemas
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('../schemas/products');

//Ruta estática
router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/filtros', (req, res) => {
  res.json({ name: 'Lámpara', price: 200 });
});
//Ruta dinámica
router.get(
  '/:id',
  validateData(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const product = service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

//POST
router.post(
  '/',
  validateData(createProductSchema, 'body'),
  (req, res, next) => {
    const body = req.body;
    const product = service.create(body);
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
