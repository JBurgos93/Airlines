import { Center } from '../components/Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddFlightForm } from "../components/AddFlightForm";
import Button from 'react-bootstrap/Button';
import background from './aboutbackground.png';

export const About = () => {
    
    return(
        <div className='aboutMeBlock'>
            <h1 className='aboutMeTitle'>
                About Us
            </h1>
            <Center>
                <img src={background} className="myImage" alt="logo" />
                <div>
                    <h3 className='aboutMeText'>Who We Are</h3>
                    <p className='aboutMeText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam tempore assumenda omnis molestias fuga, vero alias eveniet minima, reprehenderit fugit maxime eius doloribus veniam aperiam inventore. Ex cum amet ipsa.</p>

                    <h3 className='aboutMeText'>What We Do</h3>
                    <p className='aboutMeText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam tempore assumenda omnis molestias fuga, vero alias eveniet minima, reprehenderit fugit maxime eius doloribus veniam aperiam inventore. Ex cum amet ipsa.</p>

                    <h3 className='aboutMeText'>Contact Us</h3>
                    <p className='aboutMeText'>(123) 456 - 7890 <br/> sample@email.com</p>
                </div>
            </Center>
        </div>
    );
}
/*

*/