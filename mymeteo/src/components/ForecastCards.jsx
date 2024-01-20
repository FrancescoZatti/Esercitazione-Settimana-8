import React from 'react';
import { useLocation } from 'react-router-dom';
import { WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi";

export default function ForecastCards() {
    const location = useLocation();
    const { data2 } = location.state;

    const dateFilter = data2.filter(item => item.dt_txt.includes('12:00:00')).map(item => {
        const date = new Date(item.dt_txt);
        return date;
    });

    const getBackgroundClass = (weatherData) => {
      if (weatherData.weather && weatherData.weather.length > 0) {
        switch (weatherData.weather[0].main) {
          case 'Clouds':
            return 'appCloudsCard';
          case 'Thunderstorm':
            return 'appThunderstormCard';
          case 'Snow':
            return 'appSnowCard';
          case 'Clear':
            return 'appClearCard';
          case 'Rain':
            return 'appRainCard';
          case 'Drizzle':
            return 'appDrizzleCard';
          case 'Mist':
            return 'appMistCard';
          default:
            return 'undefinedBackgroundCard';
        }
      } else {
        return 'undefinedBackgroundCard';
      }
    };
    
  
    return (
      <div
      style={{
        width: '80%',
        padding: '1rem',
        margin: '2rem auto',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
      }}>
        <h2 className='bold mb-4'>I prossimi 5 giorni:</h2>
        {dateFilter.slice(0).map((date, index) => {
          const weatherData = data2.find(item => new Date(item.dt_txt).getTime() === date.getTime());
          const backgroundClass = getBackgroundClass(weatherData);
          return (
            <div className={`forecastCard ${backgroundClass}`}>
              <p key={index}>{date.toString()}</p>
              <p key={index}>Temperatura: {weatherData.main.temp} °C</p>
              <p key={index}>Umidità: {weatherData.main.humidity} %</p>
              <p key={index}>Vento: {weatherData.wind.speed} km/h</p>
              <p key={index}>Clima: {weatherData.weather[0].main}</p>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`} width="100px" alt="weather"/>
            </div>
          );
        })}
      </div>
    );
  }