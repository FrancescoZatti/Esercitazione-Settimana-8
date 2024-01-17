import React from "react";
import '../index.css';
import { useLocation } from "react-router-dom";

export default function MeteoResults() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  const updateBackgroundClass = (weatherData) => {
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
  };

  return (
    <div className={`App ${backgroundClass}`}>
      <div className="container">
        <div className='top'>
          <div className='location'>
            <p>{data?.name}</p>
          </div>
          <div className='temp'>
            {data?.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className='description'>
            {data?.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
          {data?.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data?.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
          {data?.wind ? <p className='bold'>{data.wind.speed} km/h</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
