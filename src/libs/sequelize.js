const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');
const { dbUrl, isProd } = require('../config/config');

//const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const options = {
  dialect: 'postgres',
  logging: isProd ? false : true,
};

if (isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(dbUrl, options);
setupModels(sequelize);
/* async function createTables() {
  
  await sequelize.sync();
}

createTables(); */

module.exports = sequelize;
