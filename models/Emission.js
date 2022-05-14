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
    co2: String,
    ch4: String,
    n2o: String,
    totalTon: String,
    totalFuente: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
});

module.exports = mongoose.model('Emission', EmissionSchema);