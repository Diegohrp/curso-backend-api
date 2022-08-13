const { Pool } = require('pg');
const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
} = require('../config/config');

const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const pool = new Pool({
  connectionString: URI,
});

module.exports = pool;
