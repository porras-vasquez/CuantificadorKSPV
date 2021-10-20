const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


passport.serializeUser((user, done) => {
    done(null, user._id)
});
passport.serializeUser((id, done) => {
    const user = User.findById(id);
    done(mull, user);
});
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passworField: 'password',
    passReqToCallBack: true
}, async(req, email, password, done) => {
    const user = new User();
    user.email = email;
    user.password = password;
    await user.save();
    done(null, user);
}));