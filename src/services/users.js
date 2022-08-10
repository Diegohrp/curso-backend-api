const boom = require('@hapi/boom');
const createConnection = require('../libs/postgres');
class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    //Establecemos la conexión, la función retorna un cliente con la conexión ya hecha
    const client = await createConnection();
    const res = await client.query('SELECT * FROM task');
    return res.rows;
  }

  async findOne(id) {
    return { id };
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

module.exports = UserService;
