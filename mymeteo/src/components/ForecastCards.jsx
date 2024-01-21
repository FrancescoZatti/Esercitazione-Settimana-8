import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ForecastCards() {
    const location = useLocation();
    const { data2 } = location.state;
    const [isOpen, setIsOpen] = useState(false);

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
        <h2 className='btn text-light fs-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>I prossimi 5 giorni{isOpen ? <IoIosArrowUp className='ms-2' /> : <IoIosArrowDown className='ms-2' />}</h2>
        {isOpen && dateFilter.slice(0).map((date, index) => {
          const weatherData = data2.find(item => new Date(item.dt_txt).getTime() === date.getTime());
          const backgroundClass = getBackgroundClass(weatherData);

          let str = date.toString();
          let words = str.split(' ');
          let firstFourWords = words.slice(0, 4).join(' ');

          return (
            <div className={`forecastCard ${backgroundClass}`}>
              <p key={index} className='fs-5 bold'>{firstFourWords}</p>
              <hr />
              <div className='d-flex justify-content-between flex-wrap'>
                <div>
                  <p key={index} className='fs-2'>{weatherData.weather[0].main}</p>
                  <img src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`} width="100px" alt="weather"/>
                  <p key={index} className='fs-2 bold'><WiThermometer className="fs-1 me-1" />{weatherData.main.temp} °C</p>
                </div>
                <div style={{
                  paddingRight: '8rem',
                  paddingLeft: '2rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '1rem',
                }}>
                  <p key={index} className='fs-5'><WiThermometer className="fs-1 me-1" />Temperatura Percepita: {weatherData.main.feels_like} °C</p>
                  <hr />
                  <p key={index} className='fs-5'><WiHumidity className="fs-1 me-1" />Umidità: {weatherData.main.humidity} %</p>
                  <hr />
                  <p key={index} className='fs-5'><WiStrongWind className="fs-1 me-1" />Vento: {weatherData.wind.speed} km/h</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }