const boom = require('@hapi/boom');

const { apiKey } = require('../config/config');

function verifyApiKey(req, res, next) {
  const API_KEY = req.headers['api-key'];
  if (API_KEY === apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    /*
      El token viene en req.user, 
      eso lo gestiona passport, le da ese nombre de user
    */
    const tokenPayload = req.user;
    if (roles.includes(tokenPayload.role)) {
      next();
    } else {
      next(boom.forbidden());
    }
  };
}

module.exports = { verifyApiKey, checkRoles };
