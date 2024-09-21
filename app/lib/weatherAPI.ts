import axios from 'axios';

const API_KEY = 'd92a9ce0c0d22e2f701417b182bab4ad';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};

export const getForecastByCity = async (city: string) => {
  const response = await axios.get(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
