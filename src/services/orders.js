const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class OrderService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: ['user'] }, 'items'],
    });
    return order;
  }

  async findByUser(userId) {
    //La tabla de "Orders" tiene una asociación con la tabla "Customers"
    //La tabla "Customers es la que tiene la asociación con la tabla "Users"
    const orders = await models.Order.findAll({
      where: {
        /*
          Utilizamos la asociación que denominamos como customer para
          acceder a la asociación que denominamos user (asociación con la tabla Users)
          para acceder al campo id de la tabla Users
        */
        '$customer.user.id$': userId,
      },
      include: [{ association: 'customer', include: 'user' }],
    });
    return orders;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
