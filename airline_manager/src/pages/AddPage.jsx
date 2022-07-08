import { Center } from '../components/Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddFlightForm } from "../components/AddFlightForm";
import Button from 'react-bootstrap/Button';

export const AddPage = () => {
    
    const [flights, setFlights]  = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/flights')
            .then(res => setFlights(res.data))
    }, []);
    
    return(
        <Center>
            <AddFlightForm />
        </Center>
    );
}