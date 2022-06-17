const Flight = require('../models/Flight.model');

const createFlight = async ({flightNumber, modelType, depDate, ArrDate, depTime, arrTime, depAirport, arrAirport, passengerCount, passengerCap}) => {
    try {

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

module.exports = {createFlight, findFlightById, findAllFlights};