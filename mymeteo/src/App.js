import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import { BsHeart, BsHeartFill, BsTrash, BsGeoAlt } from "react-icons/bs";
import Footer from './components/MyFooter';

function App() {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [location, setLocation] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem('searchHistory');
    const storedFavoriteLocations = localStorage.getItem('favoriteLocations');

    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }

    if (storedFavoriteLocations) {
      setFavoriteLocations(JSON.parse(storedFavoriteLocations));
    }
  }, []);

  const apiKey = '74203b05066301acc6f6d3a0bb311f51';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  /*https://api.openweathermap.org/data/2.5/forecast?q=parma&appid=74203b05066301acc6f6d3a0bb311f51*/

  const search = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setLocation('');
  
      if (!searchHistory.some(item => JSON.stringify(item) === JSON.stringify(response.data))) {
        const updatedSearchHistory = [response.data, ...searchHistory];
        const limitedHistory = updatedSearchHistory.slice(0, 5);
  
        setSearchHistory(limitedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
      }
  
      setData(response.data);
      const data2 = await search2();
      navigate('/results', { state: { data: response.data, data2: data2 } });
    } catch (error) {
      console.log(error);
      setData({});
    }
  };
  
  const search2 = async () => {
    try {
      const response = await axios.get(url2);
      console.log(response.data.list);
      return Array.isArray(response.data.list) ? response.data.list : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  const searchClick = async (searchTerm = '') => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm || location}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      console.log(response.data);
      setLocation('');
  
      if (!searchHistory.some(item => JSON.stringify(item) === JSON.stringify(response.data))) {
        const updatedSearchHistory = [response.data, ...searchHistory];
        const limitedHistory = updatedSearchHistory.slice(0, 5);
  
        setSearchHistory(limitedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
      }
  
      setData(response.data);
      const data2 = await searchClick2(searchTerm); // pass searchTerm to searchClick2
      navigate('/results', { state: { data: response.data, data2: data2 } });
    } catch (error) {
      console.log(error);
      setData({});
    }
  };
  
  const searchClick2 = async (searchTerm = '') => {
    try {
      const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm || location}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url2);
      console.log(response.data.list);
      return Array.isArray(response.data.list) ? response.data.list : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  const handleHistoryClick = async (searchItem) => {
    // Call searchClick and searchClick2 with searchItem.name as the search term
    await searchClick(searchItem.name);
    await searchClick2(searchItem.name);
  };
  
  const handleFavoriteClick = async (searchItem) => {
    const isFavorite = favoriteLocations.some(item => item.name === searchItem.name);
  
    if (isFavorite) {
      const updatedFavorites = favoriteLocations.filter(item => item.name !== searchItem.name);
      setFavoriteLocations(updatedFavorites);
      localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [searchItem, ...favoriteLocations];
      setFavoriteLocations(updatedFavorites);
      localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
    }
  };
  

  const handleReset = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleDeleteHistoryItem = (index) => {
    const updatedSearchHistory = [...searchHistory];
    updatedSearchHistory.splice(index, 1);
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
  };

  const renderEmptyMessage = (section) => {
    return (
      <p className="emptyMessage" style={{ textAlign: 'center', opacity: 0.5, fontWeight: 'lighter' }}>{`${section}`}</p>
    );
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      search();
      search2();
    }
  }

  const handleSearchClick = () => {
    searchClick();
    searchClick2();
  }

  return (
      <div className="App">
        <MyNavbar />
        <div 
        className='text-center py-5 bg-light bg-opacity-10' 
        style={{width: 'auto', margin: 'auto', borderRadius: '10px', marginTop: '2rem'}}>
          <p className="fs-1">Il Meteo di oggi,
            <span className='d-block bold'>quando vuoi, dove vuoi!</span>
          </p>
        </div>
        <div className="search mt-5">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Cerca località"
            type="text"
            onKeyPress={handleSearch}
            as={Link}
            to="/results"
            style={{ width: '50%' }}
          />
          <button onClick={handleSearchClick} className="searchButton" as={Link} to="/results">
            Cerca
          </button>
        </div>
        <hr style={{ width: '85%', margin: '2rem auto' }} />
        <div className="searchHistory my-0">
          <div>
            <BsGeoAlt className="fs-4 me-2" />
            <span className='bold fs-5'>Le Località che hai cercato:</span>
          </div>
          {searchHistory.length > 0 ? (
            <ul className="historyList">
              {searchHistory.map((item, index) => (
                <li key={index} className='historyVoice d-flex align-items-center justify-content-between pe-5'>
                  <span onClick={() => handleHistoryClick(item)} className='clickableItems'>
                    {item.name}
                  </span>
                  <div className="d-flex align-items-center">
                    <span onClick={() => handleFavoriteClick(item)} className='clickableItems me-4'>
                      {favoriteLocations.some(favorite => favorite.name === item.name) ? <BsHeartFill className='text-danger' /> : <BsHeart />}
                    </span>
                    <span onClick={() => handleDeleteHistoryItem(index)} className='clickableItems'>
                      <BsTrash />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : renderEmptyMessage("Non hai ancora effettuato nessuna ricerca!")}
          <div style={{ textAlign: 'center' }}>
            <button onClick={handleReset} className="searchButton">
              Cancella tutte le ricerche
            </button>
          </div>
        </div>
        <hr style={{ width: '85%', margin: '2rem auto' }} />
        <div id='preferiti' className="favoriteLocations my-0">
          <div>
            <BsHeart className="fs-4 me-2" />
            <span className='bold fs-5'>Le tue Località Preferite:</span>
          </div>
          {favoriteLocations.length > 0 ? (
            <ul className="favoritesList">
              {favoriteLocations.map((item, index) => (
                <li key={index} className='historyVoice d-flex align-items-center justify-content-between pe-5'>
                  <span onClick={() => handleHistoryClick(item)} className='clickableItems'>
                    {item.name}
                  </span>
                  <div className="d-flex align-items-center">
                    <span onClick={() => handleFavoriteClick(item)} className='clickableItems me-4'>
                      <BsHeartFill className='text-danger' />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : renderEmptyMessage("Premi il cuoricino nelle località cercate per aggiungere le tue preferite!")}
        </div>
        <Footer />
      </div>
      
  );
}

export default App;