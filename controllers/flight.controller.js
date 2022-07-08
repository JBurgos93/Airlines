const Flight = require('../models/Flight.model');

const createFlight = async ({flightNumber, modelType, depDate, arrDate, depTime, arrTime, depAirport, arrAirport, passengerCount, passengerCap}) => {
    try {
        const flight = new Flight({
            flightNumber,
            modelType,
            depDate,
            arrDate,
            depTime,
            arrTime,
            depAirport,
            arrAirport,
            passengerCount,
            passengerCap
        });
        await flight.save();
        return flight._id;
    } catch (err) {
        console.err(err);
        throw { status: 400, message: err};
    }
}

const findFlightById = async id => {
    try {
        const flight = await Flight.findById(id);
        if(flight == null){
            throw `No flight with id: ${id} was found.`;
        }
        return flight;
    } catch (err) {
        console.log(err);
        throw { status: 400, message: err};
    }
}

const findAllFlights = async (limit=0) => {
    const flights = await Flight.find();
    return flights;
}

const removeFlightById = async id => {
    try{
        const flight = await Flight.findByIdAndDelete(id);
        if(flight == null){
            throw `No flight with id: ${id} was found.`;
        }
        return flight;
    } catch(err){
        console.log(err);
        throw { status: 400, message: err};
    }
}
const updateFlightById = async (id, body) => {
    try{
        console.log("POPOPOPOP");
        const flight = await Flight.findByIdAndUpdate(id, body);
        if(flight == null){
            throw `No flight with id: ${id} was found.`;
        }
        return flight;
    } catch(err){
        console.log(err);
        throw { status: 400, message: err};
    }
}

module.exports = {createFlight, findFlightById, findAllFlights, removeFlightById, updateFlightById};