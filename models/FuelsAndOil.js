'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const FuelsAndOilSchema = new Schema({
    combustible: String,
    categoria_seleccion: String,
    feCo2_L: String,
    feCH4_L: String,
    feN20_L: String,
    componente: String,
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
/*
    medidor: [{
            nrc : { type: String, required: true, unique: false },
            type : { type: String, required: true, unique: false },
            medida : { type: String, required: true, unique: false },
            enero: {type: String, unique: false},
            febrero: {type: String, unique: false},
            marzo: {type: String, unique: false},
            abril: {type: String, unique: false},
            mayo: {type: String, unique: false},
            junio: {type: String, unique: false},
            julio: {type: String, unique: false},
            agosto: {type: String, unique: false},
            septiembre: {type: String, unique: false},
            octubre: {type: String, unique: false},
            noviembre: {type: String, unique: false},
            diciembre: {type: String, unique: false}
        }   
    ],
    companies: [{
            type: Schema.Types.ObjectId,
            ref: 'companies'
        }
    ]*/
});

// ElectricitySchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

// ElectricitySchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };
//ElectricitySchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('FuelsAndOil', FuelsAndOilSchema);