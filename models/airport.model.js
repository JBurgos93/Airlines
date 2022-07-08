const mongoose = require('mongoose');
//const { isNumber } = require('util');
const Schema = mongoose.Schema;
// not specifying _id so it gets auto generated
const airportSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Airport = mongoose.model('Airport', airportSchema, 'Airports');
module.exports = Airport;