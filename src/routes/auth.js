const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthService = require('../services/auth');
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      //con middleware done() retornamos el usuario en la estrategia que hicimos
      //Acá obtenemos ese usuario de req
      const user = req.user;
      res.json(service.signToken(user)); //Devuelve el usuario y el token
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const message = await service.sendRecovery(email);
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const message = await service.changePassword(token, newPassword);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
