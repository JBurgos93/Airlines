import { Center } from '../Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EditFlightForm } from "../EditFlightForm";
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

export const EditModal = () => {
    const location = useLocation();
    const { id } = location.state;
    
    return(
        <Center>
            <EditFlightForm state={{id: id}}/>
        </Center>
    );
}