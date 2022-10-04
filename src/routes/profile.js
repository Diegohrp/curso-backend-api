const express = require('express');
const OrderService = require('../services/orders');
const passport = require('passport');
const router = express.Router();
const service = new OrderService();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user; //obtenemos el sub del payload del token
      const orders = await service.findByUser(sub);
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
