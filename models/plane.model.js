const mongoose = require('mongoose');
//const { isNumber } = require('util');
const Schema = mongoose.Schema;
// not specifying _id so it gets auto generated
const planeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    }
});

const Plane = mongoose.model('Plane', planeSchema, 'Planes');
module.exports = Plane;