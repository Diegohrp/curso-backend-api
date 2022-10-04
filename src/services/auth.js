const boom = require('@hapi/boom');
const bcrypy = require('bcrypt');
const { jwtSecret } = require('../config/config');
const jwt = require('jsonwebtoken');
const UserService = require('../../../services/users');
const service = new UserService();

class AuthService {
  //Servicio para la local strategy de passport
  //Migramos la lógica acá
  async validateUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      //done(error,user)
      throw boom.unauthorized();
    }
    //Comparamos las contraseñas
    //A la ingresada se le genera un hash
    //En la db tenemos el hash de la contraseña
    const passwordMatch = await bcrypy.compare(password, user.password);
    if (!passwordMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  //Servicio para la ruta de login
  //Lógica para firmar el token
  signToken(user) {
    const payload = {
      sub: user.id, //subject, identificador único
      role: user.role,
    };
    const token = jwt.sign(payload, jwtSecret);
    return {
      user,
      token,
    };
  }
}

module.exports = AuthService;
