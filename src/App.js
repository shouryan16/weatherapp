import React from 'react';
import './App.css';
import  { useEffect, useState } from 'react';
import Weather from './components/Weather';
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const API_key = "25645b15891e886c92d9a8ebb69e6748";

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
    )
      .then((res) => res.json())
      .then((res) => {
        setLat(res.coord.lat);
        setLong(res.coord.lon);
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

   await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });   

    }
     fetchData();
  }, [lat, long])
  
  return (
    <div className="App">
         {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data} setCity={setCity}/>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
       </div>
     )}
    </div>
  );
}
 
export default App; 