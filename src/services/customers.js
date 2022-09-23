const boom = require('@hapi/boom');
/* const createConnection = require('../libs/postgres'); */
//sequelize es un obj, extraemos el atributo models
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async find() {
    const res = await models.Customer.findAll({
      include: ['user'],
    });
    return res;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (customer) {
      return customer;
    } else {
      throw boom.notFound('Customer not found');
    }
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const res = await customer.update(changes);
    return res;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const res = await customer.destroy();
    return res;
  }
}

module.exports = CustomerService;
