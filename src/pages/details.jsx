import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  }, [cityName]);

  if (!cityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='text-white'>{cityDetails.name}, {cityDetails.sys.country}</h2>
      <h2 className='text-white'>{cityDetails.main.temp}</h2>
      {/* Diğer detayları buraya ekleyebilirsiniz */}
    </div>
  );
}

export default WeatherCityDetails;