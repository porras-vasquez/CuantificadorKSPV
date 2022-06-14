'use strict'
require('../connection');
const User = require("../models/User");
let userController = {};
const passport = require('passport');
let status = 0;
let message = "";
/**
 * @param {string} statusCode Codigo de estado devuelto por una funcion al ser ejecutada, se toma para lanzar un mensaje
 * Status: 200 ¡Realizado exitosamente!
 * Status: 400 ¡Error, solicitud incorrecta!
 * Status: 401 ¡Error, usuario no autenticado!
 * Status: 404 ¡Ocurrió un problema con la ruta de acceso!
 * Status: 500 ¡Lo sentimos, ocurrió un problema con el servidor!
 * Status: 503 ¡Lo sentimos, el servidor se encuentra en mantenimiento!
 */
function verifyStatus(statusCode) {
    if (statusCode == 200) {
        status = 200;
        message = "¡Realizado exitosamente!";
    } else if (statusCode == 400) {
        status = 400;
        message = "¡Error, solicitud incorrecta!";
    } else if (statusCode == 401) {
        status = 401;
        message = "¡Error, usuario no autenticado!";
    } else if (statusCode == 404) {
        status = 404;
        message = "¡Ocurrió un problema con la ruta de acceso!";
    } else if (statusCode == 500) {
        status = 500;
        message = "¡Lo sentimos, ocurrió un problema con el servidor!";
    } else if (statusCode == 503) {
        status = 503;
        message = "¡Lo sentimos, el servidor se encuentra en mantenimiento!";
    }
}
/**
 * Pemite guardar un registro de usuario a traves de un JSON y cifra la contraseña de usuario
 * @function save
 * @param {JSON} req 
 * @param {JSON} res 
 */
userController.save = async function (req, res) {
    let user = new User(req.body);
    user.password = await user.encryptPassword(req.body.password);
    console.log(user.password);
    await user.save(function (err) {
        if (err) {
            if (err.errors.username) {
                res.render('../views/users/NewUser', { message: "El nombre de usuario ingresado ya ha sido utilizado por otro usuario", status: 406 });
            } else if (err.errors.email) {
                res.render('../views/users/NewUser', { message: "El email ingresado ya ha sido utilizado por otro usuario", status: 406 });
            } else {

                verifyStatus(res.statusCode);
                res.render('../views/users/NewUser', { message: message, status: status });
            }
        }
        else {
            verifyStatus(res.statusCode);
            res.render('../views/users/NewUser', { message: message, status: status });
        }

    });
};

/**
 * Lista todos los registros de usuario
 * @function list
 * @param {JSON} req 
 * @param {JSON} res 
 */
userController.list = function (req, res) {
    User.find({}).exec(function (err, users) {
        if (err) {
            res.render('../views/users/AllUsers', { users: users });
        } else {
            res.render('../views/users/AllUsers', { users: users });
        }
    });
};
/**
 * Recibe un parámetro desde la vista y busca en la base de datos un registro el cuál se utilizara para editar posteriormente
 * @function search
 * @param {JSON} req 
 * @param {JSON} res 
 */
userController.search = function (req, res) {
    User.findOne({ _id: req.params.id }).exec(function (err, user) {
        if (err) {      
            res.render('../views/users/search', { user: user });

        } else {
            res.render('../views/users/search', { user: user });
        }
    });

};
/**
 * Actualiza un registro de usuario mediante un JSON enviado por la vista
 * @function update
 * @param {JSON} req 
 * @param {JSON} res 
 */
userController.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email
        }
    }, { new: true },
        function (err, user) {
            if (err) {
                verifyStatus(res.statusCode);
                User.find({}).exec(function (err, users) {
                    if (err) {
                        res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                    } else {
                        res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                    }
                });
            } else {
                verifyStatus(res.statusCode);
                User.find({}).exec(function (err, users) {
                    if (err) {
                        res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                    } else {
                        //return res.json("all users updated");
                        res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                    }
                });
            }
        });
};
/**
 * Elimina un registro en base a su id
 * @function delete
 * @param {JSON} req 
 * @param {JSON} res 
 */
userController.delete = function (req, res) {

    User.remove({ _id: req.params.id }, function (err) {
        if (err) {
            verifyStatus(res.statusCode);
            User.find({}).exec(function (err, users) {
                if (err) {
                    res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                } else {
                    console.log(res.statusCode);
                    res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                }
            });
        } else {
            verifyStatus(res.statusCode);
            User.find({}).exec(function (err, users) {
                if (err) {
                    res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                } else {

                    res.render('../views/users/AllUsers', { users: users, message: message, status: status });
                }
            });
        }

    });

};
/**
 * Verifica la autenticación de las crendenciales de usuario
 */
userController.login = passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/users/principal',
    failureFlash: true
});
/**
 * Elimina la sesión del usuario
 * @function logout
 * @param {JSON} req 
 * @param {JSON} res 
 */
userController.logout = (req, res) => {
    req.logout();
    res.redirect("/users/principal");
};
module.exports = userController;