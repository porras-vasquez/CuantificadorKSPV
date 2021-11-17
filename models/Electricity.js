'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ElectricitySchema = new mongoose.Schema({
    titulo: String,
    nise: String,
    unidad_medida: String,
    fuente_reporte: String,
    ubicacion: String,
    observacion: String,
    medidor: [{
            nrc : { type: String, required: true, unique: false },
            type : { type: String, required: true, unique: false },
            medida : { type: String, required: true, unique: false }
        }   
    ]/*,
    companies: [{
            type: Schema.Types.ObjectId,
            ref: 'companies'
        }
    ]*/
});

// ElectricitySchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

// ElectricitySchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };
//ElectricitySchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('Electricity', ElectricitySchema);