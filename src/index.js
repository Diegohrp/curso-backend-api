const express = require('express');
const routerAPI = require('./routes');
const cors = require('cors');
const {
  errorHandler,
  logErrors,
  boomErrors,
} = require('./middlewares/errors.middlewares');
const port = process.env.PORT || '3000';
const app = express();
app.use(express.json());

//Solving CORS error
const whitelist = ['http://127.0.0.1:5500', 'https://myapp.co'];
const options = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

routerAPI(app);

app.use(logErrors);
app.use(boomErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening port: ' + port);
});
