const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    var user = await User.findById(id);
    done(null, user);
  });

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
   // passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, passwordd, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, console.log(  'No User Found'));
    }
    const match = await user.comparePassword(passwordd, user.password);
    if(!match) {
      return done(null, false, console.log( match));
    }
    return done(null, user);
  })); 