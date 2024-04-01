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
  const mintemperature = Math.floor(cityDetails.main.temp_min);
  const maxtemperature = Math.floor(cityDetails.main.temp_max);
  const windspeed = Math.floor(cityDetails.wind.speed);
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
    <div>
    <div className={"p-3 rounded-lg bg-weather-details-bg flex flex-col items-center justify-between"}>
      <div className={`weather-details ${backgroundClass} p-3 rounded-lg bg-cover bg-no-repeat text-white`}>
        <h2 className='text-heading-sm font-text-bold'>{cityDetails.name}, {cityDetails.sys.country}</h2>
        <h3 className='text-heading-xs font-text-normal mb-20'>{dayName}, {formattedDate}</h3>
        <div className='flex flex-row items-center'>
          <div className='mr-12'>
            <h2 className='text-heading-xl font-heading-extrabold'>{temperature}°c</h2>
            <h2 className='text-heading-sm font-text-bold'>{mintemperature}°c / {maxtemperature}°c</h2>
            <h2 className='capitalize'>{cityDetails.weather[0].description}</h2>
          </div>
          <div className=''>
            <img src={`./images/icons/${cityDetails.weather[0].icon}.svg`} alt="Weather Icon" className='w-[10rem]'/>
          </div>
        </div>
      </div>
    </div>
    <div className={"p-3 mt-3 rounded-lg bg-weather-details-bg flex flex-col items-center justify-between text-white"}>
      <div className="flex flex-col space-y-3 w-full max-w-screen-sm p-3">
        <div className="flex justify-between items-center border-b border-base-700 pb-3">
          <span className="font-semibold text-lg pr-3">
            <img src='./images/icons/thermal-sensation.svg'></img></span>
          <div className="flex">
            <span className="px-3 text-base-200 text-heading-xs font-text-bold">Thermal Sensation</span>
          </div>
          <span className="font-semibold text-lg text-right pl-3 ml-auto text-heading-sm">{temperature}°c</span>
        </div>
        <div className="flex justify-between items-center border-b border-base-700 pb-3">
          <span className="font-semibold text-lg pr-3">
            <img src='./images/icons/probability-of-rain.svg'></img></span>
          <div className="flex">
            <span className="px-3 text-base-200 text-heading-xs font-text-bold">Probability of Rain</span>
          </div>
          <span className="font-semibold text-lg text-right pl-3 ml-auto text-heading-sm">{cityDetails.clouds.all}%</span>
        </div>
        <div className="flex justify-between items-center border-b border-base-700 pb-3">
          <span className="font-semibold text-lg pr-3">
            <img src='./images/icons/wind-speed.svg'></img></span>
          <div className="flex">
            <span className="px-3 text-base-200 text-heading-xs font-text-bold">Wind Speed</span>
          </div>
          <span className="font-semibold text-lg text-right pl-3 ml-auto text-heading-sm">{windspeed} km/h</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg pr-3">
            <img src='./images/icons/air-humadity.svg'></img></span>
          <div className="flex">
            <span className="px-3 text-base-200 text-heading-xs font-text-bold">Air Humidity</span>
          </div>
          <span className="font-semibold text-lg text-right pl-3 ml-auto text-heading-sm">{cityDetails.main.humidity}%</span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default WeatherCityDetails;