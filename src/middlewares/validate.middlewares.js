const boom = require('@hapi/boom');

function validateData(schema, origin) {
  return function (req, res, next) {
    const data = req[origin];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badData(error));
    } else {
      next();
    }
  };
}

module.exports = validateData;
