'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AirConditioningShema = new Schema({
    ubicacion: String,
    serie: String,
    marca: String,
    modelo: String,
    capacidad: String,
    consumo: String,
    tipoRefrigerante: String,
    capacidadConfinamiento: String,
    aplicacion: String,
    tasaAnualFuga: String,
    fugaTotal: String, // capacidadconfinamiento * tasaanualfuga /100
    potencialCalentamineto: String,
    totalHCFC: String, //fugatotal/1000
    totalR22: String,//fugatotal/1000
    totalCO2: String,//potencialDeCalentamiento*totalhfc
    totalCO2R22: String,//potencialDeCalentamiento*totalr22
    /*
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
    diciembre: String,*/
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
});

module.exports = mongoose.model('AirConditioning', AirConditioningShema);