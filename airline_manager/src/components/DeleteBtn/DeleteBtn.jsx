import { Center } from '../Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './style.css';

import Table from 'react-bootstrap/Table';


export const ViewTable = () => {
    const [flights, setFlights]  = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/flights')
            .then(res => setFlights(res.data))
    }, []);

    const handleDelete = (id) => {
        console.log("Delete");
        console.log(id);
        axios.post(`http://localhost:8080/flights/delete/${id}`,id);
        
    }
    const handleEdit = () => {
        console.log("Edit");
    }

    return(
        <button value={flight._id} onClick={e => handleDelete(e.target.value)}>&#9986;</button>
    );
}