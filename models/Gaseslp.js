'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const GasesShema = new Schema({
    unidad: String,
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
    emision: String,
    gei: String,
    pcg: String,
    factor: String,
    /*tonCO2: String,
    tonCH4: String,
    tonN2O: String */
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
});

module.exports = mongoose.model('Gaseslp', GasesShema);