import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

export const EditFlightForm = (props) => {

    const navigate = useNavigate();

    // References
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
    const alertRef = useRef();

    // Today's Date and Time
    const current = new Date();

    // Setting States
    const [depDateValue, onChange1] = useState(new Date());
    const [arrDateValue, onChange2] = useState(new Date());
    const [depTimeValue, onChange3] = useState();
    const [arrTimeValue, onChange4] = useState();

    const [flight, setFlight] = useState([]);
    const [flights, setFlights] = useState(props.flights);
    const [planes, setPlanes] = useState([]);
    const [airports, setAirports] = useState([]);
    const [passCap, setPassCap] = useState(0);


    const [show, setShow] = useState(false);
    const [alertText1, setAlertText1] = useState("");
    const [alertText2, setAlertText2] = useState("");
    const [alertText3, setAlertText3] = useState("");
    const [alertText4, setAlertText4] = useState("");

    // On Load
    useEffect(() => {
        axios.get(`http://localhost:8080/flights/${props.id}`, props.id)
            .then(res => setFlight(res.data));
        axios.get('http://localhost:8080/flights')
            .then(res => setFlights(res.data));
        axios.get('http://localhost:8080/plane')
            .then(res => setPlanes(res.data));
        axios.get('http://localhost:8080/airport')
            .then(res => setAirports(res.data));
    } ,[]);

    // On Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        let duplicate = false;

        setAlertText1('');
        setAlertText2('');
        setAlertText3('');
        setAlertText4('');


        flights.forEach(temp => {
            if(temp.flightNumber == flightNumberRef.current.value){
                if(flight.flightNumber != flightNumberRef.current.value){
                    duplicate = true;
                    setAlertText1('That flight number already exists. Try a different one.');
                    setShow(true);
                }
                
            }
        });

        let timeParadox = false;

        let temp1 = depTimeValue.charAt(0) + depTimeValue.charAt(1) + depTimeValue.charAt(3) + depTimeValue.charAt(4)
        let temp2 = arrTimeValue.charAt(0) + arrTimeValue.charAt(1) + arrTimeValue.charAt(3) + arrTimeValue.charAt(4)

        temp1 = parseInt(temp1);
        temp2 = parseInt(temp2);

        let temp3 = temp1 > temp2;

        let dep = `${depDateValue.getDate()}/${depDateValue.getMonth()+1}/${depDateValue.getFullYear()}`;
        let arr = `${arrDateValue.getDate()}/${arrDateValue.getMonth()+1}/${arrDateValue.getFullYear()}`;

        let temp4 = dep === arr;

        if(temp4 && temp3){
            timeParadox = true;
            setAlertText2('Arrivals must occur AFTER departures.');
            setShow(true);
        }

        let overCap = false;
        if(passengerCountRef.current.value > passengerCapRef.current.value){
            overCap = true;
            setAlertText3('Passenger count CANNOT EXCEED passenger capacity.');
            setShow(true);

        }

        let airportDup = false;
        if(depAirportRef.current.value == arrAirportRef.current.value){
            airportDup = true;
            setAlertText4('Departure and arrival airports CANNOT be the same.');
            setShow(true);
        }

        if(!duplicate && !timeParadox && !overCap && !airportDup){
            try{
            
                axios.put('http://localhost:8080/flights/update',
                    {
                        id: props.id,
                        flightNumber: flightNumberRef.current.value,
                        modelType: modelTypeRef.current.value,
                        depDate: dep,
                        arrDate: arr,
                        depTime: depTimeValue,
                        arrTime: arrTimeValue,
                        depAirport: depAirportRef.current.value,
                        arrAirport: arrAirportRef.current.value,
                        passengerCount: passengerCountRef.current.value,
                        passengerCap: passengerCapRef.current.value
                    });
                navigate('../view', {replace:true});
                window.location.reload();
            } catch(error){
                console.log('There was an error.')
            }
        }
        
    }
    const onClose = () => {
        setShow(false);
        alertRef.value = "";
    }
    const planeChange = () => {
        planes.forEach(plane => {
            if(plane.name == modelTypeRef.current.value){
                setPassCap(plane.capacity);
            }
        });
    }
    return(
        <>
            <form className="MyForm" onSubmit={handleSubmit} >
            
        <label htmlFor="Flight Number">Flight Number:</label>
        <div>
            <input id="Flight Number" type="number" placeholder="#" step="1" min="1" max="9999999" defaultValue={flight.flightNumber} ref={flightNumberRef} required={true}/>
        </div>

        <label htmlFor="modelType" >Plane:</label>
        <div>
            <select aria-label="Default select example" onChange={planeChange} ref={modelTypeRef} required={true} defaultValue={flight.modelType}>
                <option>Select a plane</option>
                {planes.map((plane, index) => {
                    return(
                        <option value={plane.name}>
                            {plane.name}
                        </option>
                    );
                })}
            </select>
        </div>

        <label htmlFor="depDate">Departure Date:</label>
        <div>
            <DatePicker onChange={onChange1} id="depDate" dateFormat="MM/dd/yyyy" ref={depDateRef} minDate={current} value={depDateValue} required={true}/>
        </div>

        <label htmlFor="arrDate">Arrival Date:</label>
        <div>
            <DatePicker onChange={onChange2} id="arrDate" dateFormat="MM/dd/yyyy" ref={arrDateRef} minDate={depDateValue} value={arrDateValue} required={true}/>
        </div>

        <label htmlFor="depTime">Departure Time:</label>
        <div>
            <TimePicker onChange={onChange3} id="depTime" ref={depTimeRef} value={depTimeValue} disableClock={true} required={true}/>
        </div>

        <label htmlFor="arrTime">Arrival Time:</label>
        <div>
            <TimePicker onChange={onChange4} id="arrTime" ref={arrTimeRef} value={arrTimeValue} disableClock={true} required={true}/>
        </div>


        <label htmlFor="depAirport">Departure Airport:</label>
        <div>
            <select aria-label="Default select example" ref={depAirportRef} required={true} defaultValue={flight.depAirport}>
                <option>Select an Airport</option>
                {airports.map((airport, index) => {
                    return(
                        <option value={airport.name}>
                            {airport.name}
                        </option>
                    );
                })}
            </select>
        </div>

        <label htmlFor="arrAirport">Arrival Airport:</label>
        <div>
            <select aria-label="Default select example" ref={arrAirportRef} required={true} defaultValue={flight.arrAirport}>
                <option>Select an Airport</option>
                {airports.map((airport, index) => {
                    return(
                        <option value={airport.name}>
                            {airport.name}
                        </option>
                    );
                })}
            </select>
        </div>

        <label htmlFor="passengerCount">Passenger Count:</label>
        <div>
            <input id="passengerCount" type="number" placeholder="0" step="1" min="0" max="999" ref={passengerCountRef} required={true} defaultValue={flight.passengerCount}/>
        </div>

        <label htmlFor="passengerCap">Passenger Cap:</label>
        <div>
            <input id="passengerCap" type="number" placeholder="0" disabled ref={passengerCapRef} value={passCap} required={true} defaultValue={flight.passengerCap}/>
        </div>

        <input type="submit" value="Update Flight" />
        <Alert ref={alertRef} variant="danger" onClose={onClose} show={show} dismissible className="alert">
        <p>{alertText1}</p>
        <p>{alertText2}</p>
        <p>{alertText3}</p>
        <p>{alertText4}</p>
        </Alert>
        </form>
    </>
    );
}