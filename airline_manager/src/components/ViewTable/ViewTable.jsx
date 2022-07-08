import { Center } from '../Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './style.css';
import {EditFlightForm} from '../EditFlightForm';
import {EditFlightForm2} from '../EditFlightForm2';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditModal } from '../EditModal';

import Table from 'react-bootstrap/Table';
import { AddFlightForm } from '../AddFlightForm';
import { AddFlightForm2 } from '../AddFlightForm2';


export const ViewTable = () => {
    //const location = useLocation();
    //const { tempId } = location.state;

    const [flights, setFlights]  = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [id, setId] = useState(null);
    const [columnSorts, setColumnSorts] = useState([0,0,0,0,0,0,0,0,0,0]);


    useEffect(() => {
        axios.get('http://localhost:8080/flights')
            .then(res => setFlights(res.data))
    }, []);

    const handleDelete = (id) => {
        console.log("Delete");
        console.log(id);
        axios.post(`http://localhost:8080/flights/delete/${id}`,id);
        window.location.reload();

    }

    const handleClose = () => {
        setShow(false);
        //window.location.reload();
    }   
    const handleClose1 = () => {
        setShow1(false);
        //window.location.reload();
    }
    const handleOpen = (event) => {
        setId(event);
        setShow(true);
    }
    const handleOpen1 = () => {
        setShow1(true);
    }
    const col1Click = () => {
        console.log("Clicked flight number column.");
        console.log(flights);
        setFlights(flights.sort((a,b) => {return a.flightNumber - b.flightNumber}));
        console.log(flights);
    }
    return(
        <Center>
            <Button className="addbtn" onClick={handleOpen1}>Add Flight</Button>
            <Modal className="modal-width" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing Flight</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditFlightForm2 id={id} flights={flights}/>
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
                    <AddFlightForm2 flights={flights}/>
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
/*
                                    <Link className="buttonStyle" state={{id: flight._id}} to="/edit" >&#9998;</Link>
                                    <Link className="buttonStyle" state={{id: flight._id}} to="/edit" >&#9998;</Link>

<button className="buttonStyle" value={flight._id}  component={Link} to="/edit" >&#9998;</button>

<Table striped bordered hover className="centertext" size="sm">
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
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Current</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight, index) => {
                        return(
                            <tr key={flight._id}>
                                <td><strong>{flight.flightNumber}</strong></td>
                                <td><strong>{flight.modelType}</strong></td>
                                <td><strong>{flight.depDate}</strong></td>
                                <td><strong>{flight.depTime}</strong></td>
                                <td><strong>{flight.depAirport}</strong></td>
                                <td><strong>{flight.arrDate}</strong></td>
                                <td><strong>{flight.arrTime}</strong></td>
                                <td><strong>{flight.arrAirport}</strong></td>
                                <td><strong>{flight.passengerCount}</strong></td>
                                <td><strong>{flight.passengerCap}</strong></td>
                            </tr>
                        );
                    })}
                    
                </tbody>
            </Table>
*/