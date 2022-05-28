'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AirConditioningShema = new Schema({
    ubicacion: String,
    serie: String,
    gei: String,
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
    totalHCFC: String, //fugatotal/1000 410
    totalR22: String,//fugatotal/1000 
    totalCO2: String,//potencialDeCalentamiento*totalhfc 410
    totalCO2R22: String,//potencialDeCalentamiento*totalr22
    totalHFC134a: String,
    totalHFC134aCo2: String,
    totalHFC152a: String,
    totalHFC152aCo2: String,
    totalR402a: String,
    totalR402aCo2: String,
    totalR402b: String,
    totalR402bCo2: String,
    totalR404a: String,
    totalR404aCo2: String,
    totalR404B: String,
    totalR404BCo2: String,
    totalR407c: String,
    totalR407cCo2: String,
    totalR410a: String,
    totalR410aCo2: String,
    totalR507: String,
    totalR507Co2: String,
    total508B: String,
    totalR508BCo2: String,
    factor_emision: String,
    /*tonHFC: String,
    tonHCFC: String,*/
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