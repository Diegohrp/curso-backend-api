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

module.exports = { verifyApiKey };
