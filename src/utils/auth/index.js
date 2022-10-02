//Importamos passport
const passport = require('passport');
//Importamos nuestra estrategia creada
const { LocalStrategy } = require('./strategies/local.strategy');
const { JwtStrategy } = require('./strategies/jwt.strategy');
//Le decimos a passport que utilice esa estrategia
passport.use(LocalStrategy);
passport.use(JwtStrategy);
