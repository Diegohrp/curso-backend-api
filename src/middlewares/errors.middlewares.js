function logErrors(err, req, res, next) {
  console.log('Log Errors');
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('Error Handler');
  res.status(500).json({
    message: err.message,
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
