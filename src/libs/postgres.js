const { Client } = require('pg');

async function createConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'userme',
    password: 'admin123',
    database: 'my_db_store',
  });
  await client.connect();
  return client;
}

module.exports = createConnection;
