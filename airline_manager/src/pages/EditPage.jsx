import { Center } from '../components/Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EditFlightForm } from "../components/EditFlightForm";
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

export const EditPage = () => {
    const location = useLocation();
    const { id } = location.state;
    return(
        <Center>
            <EditFlightForm state={{id: id}}/>
        </Center>
    );
}