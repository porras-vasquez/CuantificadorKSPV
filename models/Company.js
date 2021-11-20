'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const CompanySchema = mongoose.Schema({
    numero_documento: {
        type: String,
        unique: "El documento ingresado ya fue utilizado por otra compañia"
    },
    nombre: String,
    tipo: String,
    aprobado_por: String,
    revisado_por: String,
    fecha_elaboracion: String,
    fecha_actualizacion: String,
    descripcion: String,
    electricidad: [{
        unidad_medida : { type: String, required: true, unique: false },
        fuente_reporte : { type: String, required: true, unique: false },
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