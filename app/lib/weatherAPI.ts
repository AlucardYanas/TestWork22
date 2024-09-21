import { WeatherData } from '../types/weather'; 
import { ForecastData } from '../types/forecast'; 
import { CitySuggestion } from '../types/city'; 

const API_KEY = 'd92a9ce0c0d22e2f701417b182bab4ad'; 
export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  const data: WeatherData = await response.json();
  return data;
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  const data: ForecastData = await response.json();
  return data;
};

export const fetchCities = async (query: string): Promise<CitySuggestion[]> => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Error fetching cities');
  }

  const data: CitySuggestion[] = await response.json();
  return data;
};
