import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

export const EditFlightForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;


    const flightNumberRef = useRef();
    const modelTypeRef = useRef();
    const depDateRef = useRef();
    const arrDateRef = useRef();
    const depTimeRef = useRef();
    const arrTimeRef = useRef();
    const depAirportRef = useRef();
    const arrAirportRef = useRef();
    const passengerCountRef = useRef();
    const passengerCapRef = useRef();

    const current = new Date();

    const currentTime = current.getTime();

    const [depDateValue, onChange1] = useState(new Date());
    const [arrDateValue, onChange2] = useState(new Date());
    const [depTimeValue, onChange3] = useState(new Date());
    const [arrTimeValue, onChange4] = useState(new Date());

    const [flight, setFlight] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/flights/${id}`, id)
            .then(res => setFlight(res.data))
    } ,[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(`${flightNumberRef} ${modelTypeRef} ${depDateRef} ${arrDateRef} ${depTimeRef} ${arrTimeRef} ${depAirportRef} ${arrAirportRef} ${passengerCountRef} ${passengerCapRef} `);
        try{
            
            axios.put('http://localhost:8080/flights/update',
                {
                    id: id,
                    flightNumber: flightNumberRef.current.value,
                    modelType: modelTypeRef.current.value,
                    depDate: depDateRef.current.value,
                    arrDate: arrDateRef.current.value,
                    depTime: depTimeRef.current.value,
                    arrTime: arrTimeRef.current.value,
                    depAirport: depAirportRef.current.value,
                    arrAirport: arrAirportRef.current.value,
                    passengerCount: passengerCountRef.current.value,
                    passengerCap: passengerCapRef.current.value
                });
            navigate('../view', {replace:true});
            //window.location.reload();
        } catch(error){
            console.log(error)
        }
        try{

        } catch(error){
            console.log(error);
        }
    }
    const handleChange = async (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    return(
        <>
            <form className="MyForm" onSubmit={handleSubmit} >
                <label htmlFor="Flight Number">Flight Number:</label>
                <div>
                    <input id="Flight Number" type="number" placeholder="#" ref={flightNumberRef} defaultValue={flight.flightNumber}/>
                </div>

                <label htmlFor="modelType">Plane:</label>
                <div>
                    <input id="modelType" type="text" placeholder="Plane" ref={modelTypeRef} defaultValue={flight.modelType}/>
                </div>

                <label htmlFor="depDate">Departure Date:</label>
                <div>
                    <input id="depDate" type="text" placeholder="06/30/22" ref={depDateRef} defaultValue={flight.depDate}/>
                </div>

                <label htmlFor="arrDate">Arrival Date:</label>
                <div>
                    <input id="arrDate" type="text" placeholder="06/30/22" ref={arrDateRef} defaultValue={flight.arrDate}/>
                </div>

                <label htmlFor="depTime">Departure Time:</label>
                <div>
                    <input id="depTime" type="text" placeholder="12:00:00" ref={depTimeRef} defaultValue={flight.depTime}/>
                </div>

                <label htmlFor="arrTime">Arrival Time:</label>
                <div>
                    <input id="arrTime" type="text" placeholder="12:00:00" ref={arrTimeRef} defaultValue={flight.arrTime}/>
                </div>

                <label htmlFor="depAirport">Departure Airport:</label>
                <div>
                    <input id="depAirport" type="text" placeholder="Houston" ref={depAirportRef} defaultValue={flight.depAirport}/>
                </div>

                <label htmlFor="arrAirport">Arrival Airport:</label>
                <div>
                    <input id="arrAirport" type="text" placeholder="Houston" ref={arrAirportRef} defaultValue={flight.arrAirport}/>
                </div>

                <label htmlFor="passengerCount">Passenger Count:</label>
                <div>
                    <input id="passengerCount" type="number" placeholder="0" ref={passengerCountRef} defaultValue={flight.passengerCount}/>
                </div>

                <label htmlFor="passengerCap">Passenger Cap:</label>
                <div>
                    <input id="passengerCap" type="number" placeholder="0" ref={passengerCapRef} defaultValue={flight.passengerCap}/>
                </div>

                <input type="submit" value="Update Flight" />
            </form>
        </>
    );
}