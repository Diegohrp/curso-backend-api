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
  const product = service.create(body);
  res.status(201).json(product);
});
//PATCH
router.patch('/:id', (req, res) => {
  const body = req.body;
  const update = service.update(req.params.id, body);
  res.json(update);
});
//DELETE
router.delete('/:id', (req, res) => {
  const msg = service.delete(req.params.id);
  res.json(msg);
});

module.exports = router;
