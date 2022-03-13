'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    numero_documento: {
        type: String,
        unique: "El documento ingresado ya fue utilizado por otra compañia"
    },
    nombre: String,
    tipo: String,
    aprobado_por: String,
    fecha_inicio: String,
    descripcion: String,
    electricidad: [{
        type: Schema.Types.ObjectId,
        ref: 'Electricity'
    }],
    gaslp: [{
        type: Schema.Types.ObjectId,
        ref: 'Gaseslp'
    }],
    fuelsAndOil: [{
    type: Schema.Types.ObjectId,
    ref: 'FuelsAndOil'
}],
airConditioning: [{
    type: Schema.Types.ObjectId,
    ref: 'AirConditioning'
}]

});

// CompanySchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

// CompanySchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };
CompanySchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('Company', CompanySchema);