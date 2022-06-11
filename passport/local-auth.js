const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
passport.use('local-signin',
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({email});

      if (!user) {
        return done(null, false,{ message: "error" });
      } else {
        // Match Password's User
        const match = await user.comparePassword(password);
        if (match) {
          console.log(match);
          return done(null, user);
        } else {
          console.log(match);
          return done(null, false,{ message: "error" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});