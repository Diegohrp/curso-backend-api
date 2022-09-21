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
setupModels(sequelize);
/* async function createTables() {
  
  await sequelize.sync();
}

createTables(); */

module.exports = sequelize;
