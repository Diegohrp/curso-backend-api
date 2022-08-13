const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');
const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
} = require('../config/config');

const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (msg) => console.log(msg),
});

async function createTables() {
  setupModels(sequelize);
  await sequelize.sync();
}

createTables();

module.exports = sequelize;
