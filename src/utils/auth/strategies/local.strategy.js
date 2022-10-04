const { Strategy } = require('passport-local');

const AuthService = require('../../../services/auth');
const service = new AuthService();

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
      const user = await service.validateUser(email, password);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = { LocalStrategy };
