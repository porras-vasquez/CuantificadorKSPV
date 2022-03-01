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
    descripcion: String,
    uso: String,
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
    densidad: String,
    observacion: String,
    emision: String
});

module.exports = mongoose.model('Gases', GasesShema);