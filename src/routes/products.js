const express = require('express');
const ProductsService = require('../services/products');
const router = express.Router();
const service = new ProductsService();

//Ruta estática
router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/filtros', (req, res) => {
  res.json({ name: 'Lámpara', price: 200 });
});
//Ruta dinámica
router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  const produc = service.findOne(productId);
  res.json(produc);
});

//POST
router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    msg: 'Product created',
    data: body,
  });
});

module.exports = router;
