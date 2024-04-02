import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Çizgi grafiği için gerekli import
import '../App.css';
import Chart from 'chart.js/auto';

function WeatherCityDetails() {
  const [cityDetails, setCityDetails] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { cityName } = useParams();
  const API_KEY = 'e165b9c683c0bb393e0bacfe61b65d29';

  const getDayName = (dateString) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        setCityDetails(response.data);
      } catch (error) {
        console.error('Error fetching city details:', error);
      }
    };

    const fetchDailyForecast = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = response.data;
        const dailyData = extractDailyForecast(data.list);
        setDailyForecast(dailyData);
      } catch (error) {
        console.error('Error fetching daily forecast:', error);
      }
    };

    fetchCityDetails();
    fetchDailyForecast();
  }, [cityName, API_KEY]);

  const extractDailyForecast = (forecastList) => {
    const dailyForecastData = {};
    forecastList.forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const day = getDayName(date);
      if (!dailyForecastData[day]) {
        dailyForecastData[day] = {
          date: day,
          temperature: Math.floor(forecast.main.temp),
          temperaturemax: Math.floor(forecast.main.temp_max),
          humiditychart: Math.floor(forecast.main.humidity),
          windchart: Math.floor(forecast.wind.speed),
          temperaturemin: Math.floor(forecast.main.temp_min),
          icon: forecast.weather[0].icon
        };
      }
    });
    return Object.values(dailyForecastData);
  };

  if (!cityDetails || dailyForecast.length === 0) {
    return <div>Loading...</div>;
  }

  const temperature = Math.floor(cityDetails.main.temp);
  const mintemperature = Math.floor(cityDetails.main.temp_min);
  const maxtemperature = Math.floor(cityDetails.main.temp_max);
  const windspeed = Math.floor(cityDetails.wind.speed);
  const weatherCondition = cityDetails.weather[0].main.toLowerCase();
  const dayTime = isDayTime(cityDetails);

  function isDayTime(details) {
    const sunrise = details.sys.sunrise * 1000; 
    const sunset = details.sys.sunset * 1000; 
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

  // Çizgi grafiği için veri hazırlama
  const TempChart = {
    labels: dailyForecast.map(forecast => forecast.date),
    responsive: true,
    maintainAspectRatio: false,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dailyForecast.map(forecast => forecast.temperature),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.4)',
        tension: 0.4
      }
    ]
  };

  const HumChart = {
    labels: dailyForecast.map(forecast => forecast.date),
    responsive: true,
    maintainAspectRatio: false,
    datasets: [
      {
        label: 'Air Humidty (%)',
        data: dailyForecast.map(forecast => forecast.humiditychart),
        fill: false,
        borderColor: 'rgba(99, 132, 255, 0.4)',
        tension: 0.4
      }
    ]
  };
  const WindChart = {
    labels: dailyForecast.map(forecast => forecast.date),
    responsive: true,
    maintainAspectRatio: false,
    datasets: [
      {
        label: 'Wind Speed (km/h)',
        data: dailyForecast.map(forecast => forecast.windchart),
        fill: false,
        borderColor: 'rgba(99, 255, 132, 0.4)',
        tension: 0.4
      }
    ]
  };


  const toggleDiv = () => {
    setIsOpen(!isOpen); // isOpen değerini tersine çevirir
  };
  return (
    <div>
      <div className={"p-3 rounded-lg bg-weather-details-bg flex flex-col items-center justify-between mx-2 mt-2"}>
        <div className={`weather-details ${backgroundClass} p-3 rounded-lg bg-cover bg-no-repeat text-white w-full`}>
          <h2 className='text-heading-sm font-text-bold'>{cityDetails.name}, {cityDetails.sys.country}</h2>
          <h3 className='text-heading-xs font-text-normal mb-5'>{dayName}, {formattedDate}</h3>
          <div className='flex flex-row items-center'>
            <div className='mr-12'>
              <h2 className='text-heading-xl font-heading-extrabold'>{temperature}°c</h2>
              <h2 className='text-heading-sm font-text-bold'>{mintemperature}°c / {maxtemperature}°c</h2>
              <h2 className='capitalize'>{cityDetails.weather[0].description}</h2>
            </div>
            <div className='ml-auto'>
              <img src={`./images/icons/${cityDetails.weather[0].icon}.svg`} alt="Weather Icon" className='w-[10rem]'/>
            </div>
          </div>
        </div>
      </div>
      <div className={"p-3 mt-3 rounded-lg bg-weather-details-bg flex flex-col items-center justify-between text-white mx-2"}>
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
    <div className={"p-3 mt-3 rounded-lg bg-weather-details-bg flex flex-row items-center text-white mx-2 mb-2"}>
        <div className="flex flex-row w-full p-3">
          {dailyForecast.map((forecast, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="font-semibold text-lg">
              {forecast.date} {getDayName(forecast.date)} 
              </span>
              <span className="font-semibold text-lg text-right pl-3 ml-auto text-heading-sm">
                <img className='w-16' src={`./images/icons/${forecast.icon}.svg`} alt="Weather Icon"/>
              </span>
              <div className="flex flex-col">
                <span className="px-3 text-white text-text-sm font-text-bold">{forecast.temperaturemax}°c</span>
                <span className="px-3 text-base-200 text-text-sm font-text-bold">{forecast.temperaturemin}°c</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={"p-3 mt-3 rounded-lg bg-weather-details-bg flex flex-row items-center text-white mx-2 mb-2"}>
        <button className="bg-textbox-bg text-white w-full py-2 px-4 rounded-lg" onClick={toggleDiv}>More Weather Details</button>
      </div>
      {isOpen &&
      <div className="px-5 mt-3 rounded-lg bg-weather-details-bg flex flex-col items-center text-white mx-2 mb-2">
        <Line data={TempChart} />
      </div>
      } 
      {isOpen &&
      <div className="px-5 mt-3 rounded-lg bg-weather-details-bg flex flex-col items-center text-white mx-2 mb-2">
        <Line data={HumChart} />
      </div>
      }
      {isOpen &&
      <div className="px-5 mt-3 rounded-lg bg-weather-details-bg flex flex-col items-center text-white mx-2 mb-2">
        <Line data={WindChart} />
      </div>
      }
    </div>
  );
}

export default WeatherCityDetails;