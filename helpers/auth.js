const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("no autorizado");
  res.redirect("/users/principal");
};
module.exports = isAuthenticated;