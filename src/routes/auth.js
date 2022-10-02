const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      //con middleware done() retornamos el usuario en la estrategia que hicimos
      //Acá obtenemos ese usuario de req
      const user = req.user;
      const payload = {
        sub: user.id, //subject, identificador único
        role: user.role,
      };
      const token = jwt.sign(payload, jwtSecret);

      res.json({
        user,
        token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

module.exports = router;
