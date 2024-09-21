// lib/weatherAPI.ts
import { WeatherData } from '../types/weather'; 
import { ForecastData } from '../types/forecast'; 

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  const data: WeatherData = await response.json();
  return data;
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=YOUR_API_KEY&units=metric`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  const data: ForecastData = await response.json();
  return data;
};
