'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customers');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
