import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchCityDetails = async (cityId) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDailyForecast = async (cityId) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric`);
    return response.data.list;
  } catch (error) {
    throw error;
  }
};