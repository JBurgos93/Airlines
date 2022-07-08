import { Center } from '../components/Styles';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AddFlightForm } from "../components/AddFlightForm";
import Button from 'react-bootstrap/Button';
import background from './aboutbackground.png';
import Table from 'react-bootstrap/Table';
import './style.css';

export const Extras = () => {
    const navigate = useNavigate();

    const planeName = useRef();
    const planeCap = useRef();
    const airportName = useRef();


    const [planes, setPlanes] = useState([]);
    const [airports, setAirports] = useState([]);


    useEffect(() => {
        console.log("4444444");
        axios.get('http://localhost:8080/plane')
            .then(res => setPlanes(res.data));
            console.log("5555555");
        axios.get('http://localhost:8080/airport')
            .then(res => setAirports(res.data));

    }, []);

    const handleDelete = (id) => {
        console.log("Delete");
        console.log(id);
        axios.post(`http://localhost:8080/plane/delete/${id}`,id);
        window.location.reload();

    }
    const handleDelete2 = (id) => {
        console.log("Delete");
        console.log(id);
        axios.post(`http://localhost:8080/airport/delete/${id}`,id);
        window.location.reload();

    }
    const handleSubmitPlane = async (event) => {
        event.preventDefault();

        try{
            console.log("1111111111");
            axios.post('http://localhost:8080/plane',
            {
                name: planeName.current.value,
                capacity: planeCap.current.value
            });
            console.log("2222222");
        } catch(error){
            console.log("333333333");
            console.log(error);
        }
        navigate('../extras', {replace:true});
        window.location.reload();
    }
    const handleSubmitAirport = async (event) => {
        event.preventDefault();

        try{
            axios.post('http://localhost:8080/airport',
            {
                name: airportName.current.value
            });
        } catch(error){
            console.log(error);
        }
        navigate('../extras', {replace:true});
        window.location.reload();
    }
    return(
        <>
        <Center>
            <form className="MyForm myTable1" onSubmit={handleSubmitPlane}>
                <label htmlFor="Name">Name:</label>
                <div>
                    <input id="Name" type="string" placeholder="xxx" ref={planeName} required={true} />
                </div>

                <label htmlFor="Capacity">Capacity:</label>
                <div>
                    <input id="Capacity" type="number" placeholder="5" step="1" min="1" max="999" ref={planeCap} required={true} />
                </div>
                <input type="submit" value="Add Plane" />
            </form>
            <Table striped bordered hover className="centertext myTable2" size="sm" variant="dark">
                <thead>
                    <tr>
                        <th colSpan='2'>Planes</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {planes.map((plane, index) => {
                        return(
                            <tr key={plane._id}>
                                <td>
                                    <button className="buttonStyle" value={plane._id} onClick={e => handleDelete(e.target.value)}>&#9986;</button>
                                    <span className="alignright">{plane.name}</span>
                                </td>
                                <td>{plane.capacity}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            </Center>
            <Center className="myBlock">
            <form className="MyForm myTable1" onSubmit={handleSubmitAirport}>
                <label htmlFor="Name">Name:</label>
                <div>
                    <input id="Name" type="string" placeholder="xxx" ref={airportName} required={true} />
                </div>
                <input type="submit" value="Add Airport" />
            </form>
            <Table striped bordered hover className="centertext myTable2" size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>Airports</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {airports.map((airport, index) => {
                        return(
                            <tr key={airport._id}>
                                <td>
                                    <button className="buttonStyle" value={airport._id} onClick={e => handleDelete2(e.target.value)}>&#9986;</button>
                                    <span className="alignright">{airport.name}</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Center>
        </>
    );
}
/*

*/