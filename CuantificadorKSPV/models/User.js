'use strict'

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: "El username ingresado ya fue utilizado por otro usuario"
    },
    password: String,
    email: String
  }
);

UserSchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('User', UserSchema);