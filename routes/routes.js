const router = require('express').Router();
const { createFlight } = require('../controllers/flight.controller');
const { findAllFlights, findFlightById, removeFlightById, updateFlightById} = require('../controllers/flight.controller');
const { createAirport, findAllAirports, findAirportById, removeAirportById} = require('../controllers/airport.controller');
const { createPlane, findAllPlanes, findPlaneById, removePlaneById} = require('../controllers/plane.controller');

router.get('/flights', async (req, res) => {
    const flights = await findAllFlights();
    res.json(flights);
});

router.post('/flights', async (req, res) => {
    try {
        const flightId = await createFlight(req.body);
        res.status(201).json({_id: flightId});
    } catch (err) {
        console.log("Oh no 17!");
        res.status(err?.status || 500).json(err);
    }
});

router.get('/flights/:id', async (req, res) => {
    try {
        const flight = await findFlightById(req.params.id);
        res.json(flight);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});

router.post('/flights/delete/:id', async (req, res) => {
    try{
        const flightId = await removeFlightById(req.params.id);
        res.status(201).json({_id: flightId})
    } catch(err){
        res.status(err?.status || 500).json(err);
    }
});

router.put('/flights/update/', async (req, res) => {
    try{
        console.log("HERE");
        console.log(req.body.id);
        console.log(req.body);
        const flight = await updateFlightById(req.body.id, req.body);
        res.status(201).json({_id: flight});
    } catch(err){
        res.status(err?.status || 500).json(err);
    }
});
/* Airport */
router.get('/airport', async (req, res) => {
    const airports = await findAllAirports();
    res.json(airports);
});

router.post('/airport', async (req, res) => {
    try {
        const airportId = await createAirport(req.body);
        res.status(201).json({_id: airportId});
    } catch (err) {
        console.log("Oh no!");
        res.status(err?.status || 500).json(err);
    }
});
router.get('/airport/:id', async (req, res) => {
    try {
        const airport = await findAirportById(req.params.id);
        res.json(airport);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});
router.post('/airport/delete/:id', async (req, res) => {
    try{
        const airportId = await removeAirportById(req.params.id);
        res.status(201).json({_id: airportId})
    } catch(err){
        res.status(err?.status || 500).json(err);
    }
});
/* Plane */
router.get('/plane', async (req, res) => {
    const planes = await findAllPlanes();
    res.json(planes);
});

router.post('/plane', async (req, res) => {
    try {
        const planeId = await createPlane(req.body);
        res.status(201).json({_id: planeId});
    } catch (err) {
        console.log("Oh no!");
        res.status(err?.status || 500).json(err);
    }
});
router.get('/plane/:id', async (req, res) => {
    try {
        const plane = await findPlaneById(req.params.id);
        res.json(plane);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});

router.post('/plane/delete/:id', async (req, res) => {
    try{
        const planeId = await removePlaneById(req.params.id);
        res.status(201).json({_id: planeId})
    } catch(err){
        res.status(err?.status || 500).json(err);
    }
});
module.exports = router;