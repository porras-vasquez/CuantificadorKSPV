const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
   // req.flash("error_msg", "Not Authorized.");
   console.log("no autorizado");
    res.redirect("/login/principal");
  };
  module.exports = isAuthenticated;