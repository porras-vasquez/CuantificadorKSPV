'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ElectricitySchema = mongoose.Schema({
    medidor: {
        type: String,
        unique: "El medidor ingresado ya fue utilizado por otro reporte de electricidad"
    },
    titulo: String,
    nise: String,
    unidad_medida: String,
    fuente_reporte: String,
    ubicacion: String,
    mes: String,
    observacion: String,
    total: String
 
});

// ElectricitySchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

// ElectricitySchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };
ElectricitySchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('Electricity', ElectricitySchema);