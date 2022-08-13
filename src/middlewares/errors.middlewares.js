function logErrors(err, req, res, next) {
  console.log('Log Errors');
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('Error Handler');
  const errorMsg =
    err.errors[0].message + ': ' + err.parent.detail || err.message;
  res.status(500).json({
    message: errorMsg,
  });
}

function boomErrors(err, req, res, next) {
  if (err.isBoom) {
    console.log(err);
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { errorHandler, logErrors, boomErrors };
