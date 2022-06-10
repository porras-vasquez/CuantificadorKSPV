'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const EmissionSchema = new Schema({
    alcance: String,
    fuente_generador: String,
    cantidad: String,
    unidad: String,
    kilogram: String,
    ton: String,
    gei: String,
    pcg: String,
    totalR410aCo2: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    electricity: {
        type: Schema.Types.ObjectId,
        ref: 'Electricity'
    },
    gaslp: {
        type: Schema.Types.ObjectId,
        ref: 'Gaseslp'
    },
    fuelsAndOil: {
        type: Schema.Types.ObjectId,
        ref: 'FuelsAndOil'
    },
    airConditioning: {
        type: Schema.Types.ObjectId,
        ref: 'AirConditioning'
    },
});

module.exports = mongoose.model('Emission', EmissionSchema);