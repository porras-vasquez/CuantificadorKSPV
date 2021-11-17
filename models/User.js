'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_ROUND ="12";
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: "El username ingresado ya fue utilizado por otro usuario"
    },
    password: String,
    email: String
});

 UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(1));

 };

 UserSchema.methods.comparePassword = function (password) {
     
 console.log(this.password);
 console.log(password);
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('User', UserSchema);