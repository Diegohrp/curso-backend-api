const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypy = require('bcrypt');

const UserService = require('../../../services/users');
const service = new UserService();

const LocalStrategy = new Strategy(
  {
    //Los campos por defecto de esta estrategia son:
    //username y password
    //Pero de esta manera podemos cambiarle el nombre a los campos
    usernameField: 'email',
    passwordField: 'password',
  },
  //done es un middleware nativo de passport-local, algo como next()
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        //done(error,user)
        done(boom.unauthorized(), false);
      }
      //Comparamos las contraseñas
      //A la ingresada se le genera un hash
      //En la db tenemos el hash de la contraseña
      const passwordMatch = await bcrypy.compare(password, user.password);
      if (!passwordMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = { LocalStrategy };
