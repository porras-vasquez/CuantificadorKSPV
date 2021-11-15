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
    enero: String,
    febrero: String,
    marzo: String,
    abril: String,
    mayo: String,
    junio: String,
    julio: String,
    agosto: String,
    septiembre: String,
    octubre: String,
    noviembre: String,
    diciembre: String,
    observacion: String,
    total: {
        type: Number,
        unique: "El tipo de dato no es númerico"
    },
});

// ElectricitySchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

// ElectricitySchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };
ElectricitySchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('Electricity', ElectricitySchema);