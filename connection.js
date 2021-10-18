'use strict'

const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://Emilio:cuantificadorkspv2021@cluster0.l4ovd.mongodb.net/porras&vasquez_db?retryWrites=true&w=majority";

mongoose.connect(mongoURL || 'mongodb://localhost/porras&vasquez_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(db => console.log('DATABASE IS CONNECTED')).catch(err => console.error(err));