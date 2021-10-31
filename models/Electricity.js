'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ElectricitySchema = mongoose.Schema({
   
});

// ElectricitySchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

// ElectricitySchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };
ElectricitySchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('Electricity', ElectricitySchema);