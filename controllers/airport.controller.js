const Airport = require('../models/Airport.model');

const createAirport = async ({name}) => {
    try {
        const airport = new Airport({
            name,
        });
        
        await airport.save();
        return airport._id;
    } catch (err) {
        console.err(err);
        throw { status: 400, message: err};
    }
}

const findAirportById = async id => {
    try {
        const airport = await Airport.findById(id);
        if(airport == null){
            throw `No airport with id: ${id} was found.`;
        }
        return airport;
    } catch (err) {
        console.log(err);
        throw { status: 400, message: err};
    }
}

const findAllAirports = async (limit=0) => {
    const airports = await Airport.find();
    return airports;
}

module.exports = {createAirport, findAirportById, findAllAirports};