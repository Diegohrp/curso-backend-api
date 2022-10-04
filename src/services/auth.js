const boom = require('@hapi/boom');
const bcrypy = require('bcrypt');
const { jwtSecret } = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserService = require('../services/users');
const service = new UserService();
const {
  emailHost,
  emailPort,
  emailSenderAddress,
  emailApplicationPass,
} = require('../config/config');

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

  //Servicio para enviar el mail
  async sendMail(email) {
    //Verificamos que el mail exista en la db
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('This email is not registered in the system');
    }
    const transporter = nodemailer.createTransport({
      host: emailHost,
      secure: true, //true for 465, false for other ports
      port: emailPort,
      auth: {
        user: emailSenderAddress,
        pass: emailApplicationPass,
      },
    });
    await transporter.sendMail({
      from: emailSenderAddress,
      to: user.email,
      subject: 'Correo de prueba, no sé',
      text: 'Correo de prueba, enviado desde node.js',
      html: '<b>Correo de prueba, enviado desde node.js</b>',
    });
    return { message: 'Email has been sent' };
  }
}

module.exports = AuthService;
