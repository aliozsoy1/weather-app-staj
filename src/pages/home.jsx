import React, { useState, useEffect } from 'react';
import viteLogo from '../images/logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherByCoords, fetchCitiesByName } from '../api/weatherApi';

function Home() {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [country, setCountry] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setErrorMsg('Could not retrieve user location');
        }
      );
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchWeatherData = async () => {
        try {
          const data = await fetchWeatherByCoords(userLocation.latitude, userLocation.longitude);
          setCity(data.name);
          setCountry(data.sys.country);
        } catch (error) {
          console.error('Error fetching city details:', error);
          setErrorMsg('An error occurred while fetching city details. Please try again later.');
        }
      };

      fetchWeatherData();
    }
  }, [userLocation]);

  const handleCityChange = async (e) => {
    const { value } = e.target;
    setCity(value);

    try {
      if (value === '') {
        setCities([]);
        return;
      }
      const cities = await fetchCitiesByName(value);
      setCities(cities);
    } catch (error) {
      console.error('Error fetching city data:', error);
      
    }
  };

  const getWeatherData = async () => {
    if (userLocation) {
      try {
        const data = await fetchWeatherByCoords(userLocation.latitude, userLocation.longitude);
        history(`/weather-app-staj/${data.id}`);
      } catch (error) {
        console.error('Error fetching city data:', error);
        setErrorMsg('Could not fetch city data');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[80vh]">
      <div className="mt-10"> 
        <a href="#" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className="my-auto text-center px-3"> 
        <h1 className='heading-md mb-2'>Welcome to <span className='text-product'>TypeWeather</span></h1>
        <p className='text-base-300'>Choose a location to see the weather forecast</p>
        <input className='bg-textbox-bg px-6 py-4 w-full mt-7 rounded-lg placeholder:text-base-400 text-white' value={city} onChange={handleCityChange} name="myInput" placeholder='Search location'/>
        <div className='bg-city-list mt-2 shadow-[0_4px_30px_0px_rgba(0,0,0,0.4)] rounded-lg'>
          <ul>
            {cities.map((city, index) => (
              <li className='border-b border-solid border-textbox-bg text-left text-white  px-5 py-3 last:border-none' key={index}>
                <button onClick={() => history(`/weather-app-staj/${city.id}`)}>{city.name}, {city.country}</button>
              </li>
            ))}
          </ul>
        </div>
        {errorMsg && <div className="fixed right-10 bottom-10 p-4 bg-textbox-bg text-white">{errorMsg}</div>}
        <button className="bg-textbox-bg text-white w-full py-2 px-4 rounded-lg mt-4" onClick={getWeatherData}>Get Weather for Current Location</button>
      </div>
    </div>
  );
}

export default Home;