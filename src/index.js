const express = require('express');
const routerAPI = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrors,
} = require('./middlewares/errors.middlewares');
const port = '3000';
const app = express();
app.use(express.json());

routerAPI(app);
app.use(logErrors);
app.use(boomErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening port: ' + port);
});
