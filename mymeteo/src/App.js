import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundClass, setBackgroundClass] = useState('');

const apiKey = '74203b05066301acc6f6d3a0bb311f51';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

const search = (event) => {
    if (event.key === 'Enter') {
        axios.get(url)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                updateBackgroundClass(response.data);
            })
            setLocation('')
    }
};

const searchClick = () => {
    axios.get(url)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
            updateBackgroundClass(response.data);
        })
        .finally(() => {
            setLocation('');
        });
};

/*const updateBackgroundClass = (weatherData) => {
  if (weatherData.weather && weatherData.weather.length > 0) {
      switch (weatherData.weather[0].main) {
          case 'Clouds':
              setBackgroundClass('appClouds');
              break;
          case 'Thunderstorm':
              setBackgroundClass('appThunderstorm');
              break;
          case 'Snow':
              setBackgroundClass('appSnow');
              break;
          case 'Clear':
              setBackgroundClass('appClear');
              break;
          case 'Rain':
              setBackgroundClass('appRain');
              break;
          case 'Drizzle':
              setBackgroundClass('appDrizzle');
              break;
          case 'Mist':
              setBackgroundClass('appMist');
              break;
          default:
              setBackgroundClass('undefinedBackground');
      }
  } else {
      setBackgroundClass('undefinedBackground');
  }
};*/

  
  return (
    <>
      <div className={`App`}>
        <div className='search'>
            <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                placeholder='Cerca località'
                type="text"
                onKeyPress={search}
                as= {Link}
                to="/MeteoResults"
            />
            <button
              onClick={searchClick}
              className='searchButton'
              as={Link}
              to="/MeteoResults"
            >
              Cerca
            </button>
        </div>
      </div>
    </>
  );
}

/*<div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'> 
            {data.wind ? <p className='bold'>{data.wind.speed} km/h</p> : null}
          </div>
        </div>*/

export default App;