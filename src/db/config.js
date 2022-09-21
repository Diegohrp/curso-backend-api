const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
} = require('../config/config');

const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  development:{
    url: URI,
    dialect: 'postgres'
  },
  production:{
    url: URI,
    dialect: "postgres"
  }
}