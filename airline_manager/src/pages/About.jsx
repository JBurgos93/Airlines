import { Center } from '../components/Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddFlightForm } from "../components/AddFlightForm";
import Button from 'react-bootstrap/Button';
import background from './aboutbackground.png';

export const About = () => {
    
    return(
        <Center>
            <div className="fill">
                <img src={background} className="App-logo" alt="logo" />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatem qui facilis molestias dolores, laborum iste sed atque perspiciatis ea, similique repellendus modi, nihil magnam nostrum? Tempora minima quasi cumque!</p>
        </Center>
    );
}
/*

*/