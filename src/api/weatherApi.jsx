import axios from 'axios';

const API_KEY = '4fc3500e52a091eaabba7ee7145fed4b';

export const fetchWeatherByCoords = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCitiesByName = async (name) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${name}&type=like&appid=${API_KEY}`);
    return response.data.list.map(city => ({ name: city.name, id: city.id, country: city.sys.country }));
  } catch (error) {
    throw error;
  }
};
