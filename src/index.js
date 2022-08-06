const express = require('express');
const routerAPI = require('./routes');
const port = '3000';
const app = express();
app.use(express.json());
routerAPI(app);

app.listen(port, () => {
  console.log('Listening port: ' + port);
});
