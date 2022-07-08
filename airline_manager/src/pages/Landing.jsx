import { Center } from '../components/Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddFlightForm } from "../components/AddFlightForm";
import Button from 'react-bootstrap/Button';

import DatePicker from 'react-date-picker';
import badlayout from './badlayout.png';
export const Landing = () => {
    function refreshClock(){
        setDate(new Date());
    }
    const currentDateTime = new Date();
    //const timeText = currentDateTime.toLocaleTimeString();

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup(){
            clearInterval(timerId);
        }
    });

    return(
        <Center>
            <span>
                EST: {date.toLocaleTimeString()}
                <br />
                <img src={badlayout} className="App-logo" alt="logo" />
            </span>
        </Center>
    );
}
/*

*/