const passport = require('passport')
const key = require('../config/auth.config')
const db = require("../models")
const User = db.user
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}

// passport 結合 passport jwt 使用
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key.screat

let jwtStrategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  await User.findByPk(jwt_payload.id)
        .then(user => {
          if(user){
            return done(null,user);
          }
          return done(null,false);
        })
        .catch(err => console.log(err));
})

passport.use(jwtStrategy)

module.exports = passport

