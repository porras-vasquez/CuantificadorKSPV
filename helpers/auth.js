/**
 * Verifica que el usuario este autenticado para acceder a las diferentes vistas
 * @param {JSON} req 
 * @param {JSON} res 
 * @param {JSON} next 
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("no autorizado");
  res.redirect("/users/principal");
};
module.exports = isAuthenticated;