'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const GasesShema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    id: {
        type: String,
        unique: "El documento ingresado ya fue utilizado por otra compañia"
    },
    titulo: String,
 /*   descripcion: String,
    uso: String,
    mes: String,
    total: String,
    observacion: String,*/
});

module.exports = mongoose.model('Gases', GasesShema);