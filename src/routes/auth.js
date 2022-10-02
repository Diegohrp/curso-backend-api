const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      //con middleware done() retornamos el usuario en la estrategia que hicimos
      //Acá obtenemos ese usuario de req
      res.json(req.user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

module.exports = router;
