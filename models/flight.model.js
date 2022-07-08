const mongoose = require('mongoose');
//const { isNumber } = require('util');
const Schema = mongoose.Schema;
// not specifying _id so it gets auto generated
const flightSchema = new Schema({
    flightNumber: {
        type: Number,
        required: true,
        unique: true
    },
    modelType: {
        type: String,
        required: false
    },
    depDate: {
        type: String,
        required: false
    },
    arrDate: {
        type: String,
        required: false
    },
    depTime:  {
        type: String,
        required: false
    },
    arrTime:  {
        type: String,
        required: false
    },
    depAirport:  {
        type: String,
        required: false
    },
    arrAirport:  {
        type: String,
        required: false
    },
    passengerCount: {
        type: Number,
        required: false
    },
    passengerCap: {
        type: Number,
        required: false
    }
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;