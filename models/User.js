'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: "El username ingresado ya fue utilizado por otro usuario"
    },
    password: String,
    email: String
});

// UserSchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

// UserSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };
UserSchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('User', UserSchema);