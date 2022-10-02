const boom = require('@hapi/boom');
/* const createConnection = require('../libs/postgres'); */
//sequelize es un obj, extraemos el atributo models
const { models } = require('../libs/sequelize');
const bycrypt = require('bcrypt');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bycrypt.hash(data.password, 10); //bcrypt.hash(password,salt);
    const newData = {
      ...data,
      password: hash,
    };
    const newUser = await models.User.create(newData);
    //No retornamos el hash del pass, así que lo eliminamos del obj pero sigue en la db
    //Como estamos usando sequelize, debemos acceder a dataValues
    delete newUser.dataValues.password;
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

  async findByEmail(email) {
    const user = await models.User.findOne({
      //La clave se debe llamar igual que nuestro campo en la tabla
      //En nuestra tabla tenemos el campo email, por eso es que esto funciona
      where: { email },
    });
    return user;
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
