'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const FuelsAndOilSchema = new Schema({
    combustible: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
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
    emision: String,
    factor: String,
    gei: String,
    pcg: String,
    unidad: String,
    /*tonCO2: String,
    tonCH4: String,
    tonN2O: String*/
});

module.exports = mongoose.model('FuelsAndOil', FuelsAndOilSchema);