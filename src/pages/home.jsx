import React, { useState, useEffect } from 'react';
import viteLogo from '../images/logo.svg';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = 'e165b9c683c0bb393e0bacfe61b65d29';
  const history = useNavigate();

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setError('Could not retrieve user location');
        }
      );
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchWeatherData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=metric`);
          const data = await response.json();
          setCity(data.name);
          setCountry(data.sys.country);
          // Kullanıcı konum bilgisini aldıktan sonra otomatik olarak diğer sayfaya yönlendirme
          history(`/weather-app-staj/${data.name}`);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setError('Could not fetch weather data');
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [userLocation, history]);

  const handleCityChange = async (e) => {
    const { value } = e.target;
    setCity(value);

    try {
      if (value === '') {
        setCities([]);
        return;
      }
      const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=${API_KEY}`);
      const data = await response.json();
      if (data && data.list) {
        setCities(data.list.map(city => city.name));
        setCountry(data.list.map(city => city.sys.country));
      } else {
        setCities([]);
        setCountry('');
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
      setError('Could not fetch city data');
    }
  };

  const getWeatherData = (cityName) => {
    console.log('Getting weather data for:', cityName);
    // Burada hava durumu verilerini almak için gerekli işlemler yapılabilir
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
              {cities.map((cityName, index) => (
                <li className='border-b border-solid border-textbox-bg text-left text-white px-5 py-3 last:border-none' key={index}>
                  <button onClick={() => getWeatherData(cityName)}><Link to={`/weather-app-staj/${cityName}`}>{cityName}, {country[index]}</Link></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Home;