'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//import * as bcrypt from 'bcrypt';
const saltRounds = 10;
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: "El username ingresado ya fue utilizado por otro usuario"
    },
    password: String,
    email: String
});

 UserSchema.methods.encryptPassword =  (password) => {
   const salt =  bcrypt.genSalt(10);
    return  bcrypt.hash(password, saltRounds,null);

 };

 UserSchema.methods.comparePassword = async function (password) {
     
 console.log(this.password);
 console.log(password);
 
  return await bcrypt.compare(password, this.password);
};

UserSchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('User', UserSchema);