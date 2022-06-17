const mongoose = require('mongoose');
const { isNumber } = require('util');
const Schema = mongoose.Schema;

const flightSchema = new Schema({ // not specifying _id so it gets auto generated
    modelType: {
        type: String,
        required: true
    },
    depDate: {
        type: Date,
        required: true
    },
    arrDate: {
        type: Date,
        required: true
    },
    depTime:  {
        type: String,
        required: true
    },
    arrTime:  {
        type: String,
        required: true
    },
    depAirport:  {
        type: String,
        required: true
    },
    arrAirport:  {
        type: String,
        required: true
    },
    passengerCount: {
        type: Number,
        required: true
    },
    passengerCap: {
        type: Number,
        required: true
    }
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;