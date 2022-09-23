const boom = require('@hapi/boom');
/* const createConnection = require('../libs/postgres'); */
//sequelize es un obj, extraemos el atributo models
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    //Establecemos la conexión, la función retorna un cliente con la conexión ya hecha
    /* const client = await createConnection();
    const res = await client.query('SELECT * FROM task');
    return res.rows; */

    const res = await models.User.findAll({
      include: ['customer'],
    });
    return res;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (user) {
      return user;
    } else {
      throw boom.notFound('User not found');
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    const res = await user.destroy();
    return res;
  }
}

module.exports = UserService;
