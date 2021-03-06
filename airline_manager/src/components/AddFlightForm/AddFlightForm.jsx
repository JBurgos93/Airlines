import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Alert from 'react-bootstrap/Alert';
import './style.css';

export const AddFlightForm = () => {
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
    const current = new Date();

    // Setting States
    const [depDateValue, onChange1] = useState(new Date());
    const [arrDateValue, onChange2] = useState(new Date());
    const [depTimeValue, onChange3] = useState();
    const [arrTimeValue, onChange4] = useState();

    const [flights, setFlights] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [airports, setAirports] = useState([]);
    const [model, setModel] = useState("");
    const [passCap, setPassCap] = useState(0);


    const [show, setShow] = useState(false);
    const [alertText1, setAlertText1] = useState("");
    const [alertText2, setAlertText2] = useState("");
    const [alertText3, setAlertText3] = useState("");
    const [alertText4, setAlertText4] = useState("");
    
    useEffect(() => {
        try{
            axios.get('http://localhost:8080/flights')
                .then(res => setFlights(res.data));
            axios.get('http://localhost:8080/plane')
                .then(res => setPlanes(res.data));
            axios.get('http://localhost:8080/airport')
                .then(res => setAirports(res.data));
        } catch(error){
            console.log(error);
        }
    }, []);

    // On Form Submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Refreshing Alert Text
        setAlertText1('');
        setAlertText2('');
        setAlertText3('');
        setAlertText4('');

        // Grabbing Times
        let temp1 = depTimeValue.charAt(0) + depTimeValue.charAt(1) + depTimeValue.charAt(3) + depTimeValue.charAt(4)
        let temp2 = arrTimeValue.charAt(0) + arrTimeValue.charAt(1) + arrTimeValue.charAt(3) + arrTimeValue.charAt(4)

        temp1 = parseInt(temp1);
        temp2 = parseInt(temp2);

        let temp3 = temp1 > temp2;


        // Grabbing Dates
        let dep = `${depDateValue.getDate()}/${depDateValue.getMonth()+1}/${depDateValue.getFullYear()}`;
        let arr = `${arrDateValue.getDate()}/${arrDateValue.getMonth()+1}/${arrDateValue.getFullYear()}`;

        let temp4 = dep === arr;



        // Check for duplicate Flight Number
        let duplicate = false;
        flights.forEach(temp => {
            if(temp.flightNumber == flightNumberRef.current.value){
                duplicate = true;
                setAlertText1('That flight number already exists. Try a different one.');
                setShow(true);
            }
        });

        // Check for Arrivals happening after Departures
        let timeParadox = false;
        if(temp4 && temp3){
            timeParadox = true;
            setAlertText2('Arrivals must occur AFTER departures.');
            setShow(true);
        }

        // Check for Passenger Count being greater than Capacity
        let overCap = false;
        if(passengerCountRef.current.value > passengerCapRef.current.value){
            overCap = true;
            setAlertText3('Passenger count CANNOT EXCEED passenger capacity.');
            setShow(true);

        }

        // Check for both airports being the same place
        let airportDup = false;
        if(depAirportRef.current.value == arrAirportRef.current.value){
            airportDup = true;
            setAlertText4('Departure and arrival airports CANNOT be the same.');
            setShow(true);
        }

        // Only POSTs if all checks were good
        if(!duplicate && !timeParadox && !overCap && !airportDup){
            try{
            
                axios.post('http://localhost:8080/flights',
                    {
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

    // Updates Capacity based on plane model
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
                    <input id="Flight Number" type="number" step="1" min="1" max="9999999" placeholder="#" ref={flightNumberRef} required={true}/>
                </div>

                <label htmlFor="modelType" >Plane:</label>
                <div>
                    <select aria-label="Default select example" onChange={planeChange} ref={modelTypeRef} required={true}>
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
                    <select aria-label="Default select example" ref={depAirportRef} required={true}>
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
                    <select aria-label="Default select example" ref={arrAirportRef} required={true}>
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
                    <input id="passengerCount" type="number" placeholder="0" step="1" min="0" max="999" ref={passengerCountRef} required={true}/>
                </div>

                <label htmlFor="passengerCap">Passenger Cap:</label>
                <div>
                    <input id="passengerCap" type="number" placeholder="0" disabled ref={passengerCapRef} value={passCap} required={true}/>
                </div>

                <input type="submit" value="Add Flight" />
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