import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

function WeatherCityDetails() {
  const [cityDetails, setCityDetails] = useState(null);
  const { cityName } = useParams();
  const API_KEY = 'e165b9c683c0bb393e0bacfe61b65d29';

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setCityDetails(data);
      } catch (error) {
        console.error('Error fetching city details:', error);
      }
    };

    fetchCityDetails();
  }, [cityName, API_KEY]);

  if (!cityDetails) {
    return <div>Loading...</div>;
  }

  const temperature = Math.floor(cityDetails.main.temp);
  const weatherCondition = cityDetails.weather[0].main.toLowerCase();
  const dayTime = isDayTime(cityDetails);

  function isDayTime(details) {
    const sunrise = details.sys.sunrise * 1000; // Convert to milliseconds
    const sunset = details.sys.sunset * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    return currentTime > sunrise && currentTime < sunset;
  }

  function getBackgroundClass(condition, day) {
    if (day) {
      switch (condition) {
        case 'clear':
          return 'bg-clear-day';
        case 'clouds':
          return 'bg-cloudy-day';
        case 'rain':
          return 'bg-rainy-day';
        case 'snow':
          return 'bg-snowy-day';
        default:
          return 'bg-default-day';
      }
    } else {
      switch (condition) {
        case 'clear':
          return 'bg-clear-night';
        case 'clouds':
          return 'bg-cloudy-night';
        case 'rain':
          return 'bg-rainy-night';
        case 'snow':
          return 'bg-snowy-night';
        default:
          return 'bg-default-night';
      }
    }
  }

  const backgroundClass = getBackgroundClass(weatherCondition, dayTime);

  const unixTimestamp = cityDetails.dt;
  const date = new Date(unixTimestamp * 1000);
  const dayIndex = date.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = daysOfWeek[dayIndex];
  const formattedDate = date.toLocaleDateString();

  return (
    <div className={"p-3 rounded-lg bg-weather-details-bg flex flex-col items-center justify-between"}>
      <div className={`weather-details ${backgroundClass} p-3 rounded-lg bg-cover bg-no-repeat text-white`}>
        <h2 className='text-heading-sm font-text-bold'>{cityDetails.name}, {cityDetails.sys.country}</h2>
        <h3 className='text-heading-xs font-text-normal mb-20'>{dayName}, {formattedDate}</h3>
        <h2>{temperature}°C</h2>
        <h2>{cityDetails.weather[0].main}</h2>
      </div>
    </div>
  );
}

export default WeatherCityDetails;