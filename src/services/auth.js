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
  async sendMail(emailBody) {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      secure: true, //true for 465, false for other ports
      port: emailPort,
      auth: {
        user: emailSenderAddress,
        pass: emailApplicationPass,
      },
    });
    await transporter.sendMail(emailBody);
    return { message: 'Email has been sent' };
  }

  //Servicio para crear el link de recuperar password y enviarlo por email
  async sendRecovery(email) {
    //Verificamos que el mail exista en la db
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('This email is not registered in the system');
    }
    //Creamos el payload del token, que contiene el identificador del usuario
    const payload = { sub: user.id };
    //Firmamos el token
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '15min' });
    const link = `https://myApp.com/recovery?token=${token}`;
    //Guardamos el token en la DB
    await service.update(user.id, { recoveryToken: token });
    //Generamos el cuerpo del email
    const emailBody = {
      from: emailSenderAddress,
      to: user.email,
      subject: 'Recuperación de contraseña',
      text: `Para recuperar tu contraseña accede al siguiente link: ${link}`,
    };
    //Enviamos el email
    const message = this.sendMail(emailBody);
    return message;
  }
  async changePassword(token, newPassword) {
    try {
      //Si el token es válido, retorna el payload
      const payload = jwt.verify(token, jwtSecret);

      //Verificar existencia del usuario y retornarlo
      const user = await service.findOne(payload.sub);
      console.log(user.dataValues.recoveryToken);
      if (token !== user.dataValues.recoveryToken) {
        throw boom.unauthorized('Token not valid');
      }
      const hash = await bcrypy.hash(newPassword, 10);
      await service.update(payload.sub, {
        recoveryToken: null,
        password: hash,
      });
      return { message: 'password changed' };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = AuthService;
