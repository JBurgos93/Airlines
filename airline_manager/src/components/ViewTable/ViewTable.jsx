import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { EditFlightForm } from '../EditFlightForm';
import { AddFlightForm } from '../AddFlightForm';
import { Center } from '../Styles';
import './style.css';

export const ViewTable = () => {

    // Setting States
    const [flights, setFlights]  = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [id, setId] = useState(null);

    // On Load
    useEffect(() => {
        axios.get('http://localhost:8080/flights')
            .then(res => setFlights(res.data))
    }, []);

    // Delete Flight
    const handleDelete = (id) => {
        console.log("Delete");
        console.log(id);
        axios.post(`http://localhost:8080/flights/delete/${id}`,id);
        window.location.reload();

    }

    // Close Add Flight Modal
    const handleClose = () => {
        setShow(false);
    }   

    // Close Edit Flight Modal
    const handleClose1 = () => {
        setShow1(false);
    }

    // Open Edit Flight Modal
    const handleOpen = (event) => {
        setId(event);
        setShow(true);
    }

    // Open Add Flight Modal
    const handleOpen1 = () => {
        setShow1(true);
    }

    return(
        <Center>
            <Button className="addbtn" onClick={handleOpen1}>Add Flight</Button>
            <Modal className="modal-width" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing Flight</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditFlightForm id={id} flights={flights}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal className="modal-width" show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Flight</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddFlightForm flights={flights}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover className="centertext" size="lg" variant="dark">
                <thead>
                    <tr className="thickerColumn">
                        <th colSpan='2'>Plane Information</th>
                        <th colSpan='3'>Departure</th>
                        <th colSpan='3'>Arrival</th>
                        <th colSpan='2'>Passengers</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Flight #</th>
                        <th>Model</th>
                        <th>Dep. Date</th>
                        <th>Dep. Time</th>
                        <th>Dep. Location</th>
                        <th>Arr. Date</th>
                        <th>Arr. Time</th>
                        <th>Arr. Location</th>
                        <th>Current</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight, index) => {
                        return(

                            <tr key={flight._id}>
                                <td>
                                    <button className="buttonStyle" value={flight._id} onClick={e => handleDelete(e.target.value)}>&#9986;</button>

                                    <button className="buttonStyle" value={flight._id} onClick={e => handleOpen(e.target.value)}>&#9998;</button>
                                    <span className="alignright">{flight.flightNumber}</span>
                                </td>
                                <td>{flight.modelType}</td>
                                <td>{flight.depDate}</td>
                                <td>{flight.depTime}</td>
                                <td>{flight.depAirport}</td>
                                <td>{flight.arrDate}</td>
                                <td>{flight.arrTime}</td>
                                <td>{flight.arrAirport}</td>
                                <td>{flight.passengerCount}</td>
                                <td>{flight.passengerCap}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Center>
    );
}