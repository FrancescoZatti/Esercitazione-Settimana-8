import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import { WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi";
import Footer from './MyFooter';
import ForecastCards from './ForecastCards';

// Definisco il mio componente MeteoResults
export default function MeteoResults() {
  const location = useLocation();
  const { data } = location.state;
  const { data2 } = location.state;
  const [backgroundClass, setBackgroundClass] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // console.log(data);
  // console.log(data2);

  useEffect(() => {
    // Aggiorno la classe di sfondo in base ai dati meteorologici
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

    // Gestisco il ridimensionamento della finestra
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    updateBackgroundClass(data);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [data]);

  // Ritorno JSX per rendere il componente MeteoResults
  return (
    <div className="App">
      <MyNavbar />
      <div className={`todayWeather ${backgroundClass}`} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        margin: 'auto',
        marginTop: '2rem',
        paddingTop: '2rem',
      }}>
        <div className='top'>
          <div className='location'>
            <p>{data?.name}, {data?.sys?.country}</p>
          </div>
          <div className='temp d-flex align-items-center'>
            <WiThermometer className="fs-1 me-1" />
            {data?.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div>
            <div className='description'>
              {data?.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            
              <img src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`} width="100px" alt="weather"/>
            
          </div>
        </div>
        <div
        className={`bottom d-flex flex-wrap ${
          windowWidth <= 767 ? 'flex-column' : windowWidth >= 768 ? 'flex-row' : ''
        }`}
      >
            <div className='feels sm-m-3'>
              <div className='d-flex'>
                <WiThermometer className="fs-1 me-1" />
                <p>Percepita</p>
              </div>
              {data?.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}           
            </div>
            <div className='humidity sm-m-3'>
              <div className='d-flex'>
                <WiHumidity className="fs-1 me-1" />
                <p>Umidità</p>
              </div>
              {data?.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div>
            <div className='wind sm-m-3'>
              <div className='d-flex'>
                <WiStrongWind className="fs-1 me-1" />
                <p>Vento</p>
              </div>
              {data?.wind ? <p className='bold'>{data.wind.speed} km/h</p> : null}
            </div>
          </div>
          <div className="forecastCards">
          </div>
      </div>
      <hr style={{ width: '85%', margin: '2rem auto' }} />
      <ForecastCards />
      <div className="text-center">
        <button
          className="searchAgain mt-4 mb-5 py-2"
          onClick={() => window.history.back()}>
              Cerca altre località
        </button>
      </div>
        
      <Footer />
    </div>
  );
}
