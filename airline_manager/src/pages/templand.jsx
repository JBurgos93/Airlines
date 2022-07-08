import { Center } from '../components/Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

console.log("FLIGHTS1");
export const Landing = () => {

    const [flights, setFlights]  = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8085/flights/')
            .then(res => {
                console.log(res.data);
                return setFlights(res.data);
            });
    }, []);

    //console.log("FLIGHTS2");
    //console.log(flights);

    return(
        <Center>
            <h1>Yippee.</h1>
            words
            {flights.map((flight, index) => {
                return(
                    <div key={flight._id}>
                        <div><strong>{flight.modelType}</strong></div>
                        <div><strong>{flight.depDate}</strong></div>
                        <div><strong>{flight.arrDate}</strong></div>
                        <div><strong>{flight.depTime}</strong></div>
                        <div><strong>{flight.arrTime}</strong></div>
                        <div><strong>{flight.depAirport}</strong></div>
                        <div><strong>{flight.arrAirport}</strong></div>
                        <div><strong>{flight.passengerCount}</strong></div>
                        <div><strong>{flight.passengerCap}</strong></div>
                    </div>
                );
            })}
        </Center>
    );
}