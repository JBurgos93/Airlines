import { Center } from '../components/Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddFlightForm } from "../components/AddFlightForm";
import Button from 'react-bootstrap/Button';

import { ViewTable } from '../components/ViewTable';

export const ViewPage = () => {
    
    const [flights, setFlights]  = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/flights')
            .then(res => setFlights(res.data))
    }, []);
    
    return(
        <Center>
            <ViewTable />
            
        </Center>
    );
}
/*
<div>
                {flights.map((flight, index) => {
                    return(
                        <div key={flight._id}>
                            <div><strong>{flight._id}</strong></div>
                            <div><strong>{flight.modelType}</strong></div>
                            <div><strong>{flight.depDate}</strong></div>
                            <div><strong>{flight.arrDate}</strong></div>
                            <div><strong>{flight.depTime}</strong></div>
                            <div><strong>{flight.arrTime}</strong></div>
                            <div><strong>{flight.depAirport}</strong></div>
                            <div><strong>{flight.arrAirport}</strong></div>
                            <div><strong>{flight.passengerCount}</strong></div>
                            <div><strong>{flight.passengerCap}</strong></div>
                            <br />
                        </div>
                    );
                })}
            </div>
*/