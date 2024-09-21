'use client';

import { useState } from 'react';
import { getWeatherByCity, getForecastByCity, fetchCities } from '../lib/weatherAPI';
import { useWeatherStore } from '../store/weatherStore';
import Link from 'next/link';
import styles from '../styles/searchWeather.module.scss'; 
import { WeatherData } from '../types/weather'; 
import { ForecastData } from '../types/forecast';

import { CitySuggestion } from '../types/city'; // Импортируем тип для города

const SearchWeather = () => {
  const [city, setCity] = useState<string>(''); 
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]); // Используем тип CitySuggestion
  const [weather, setWeather] = useState<WeatherData | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 

  const { addFavorite, removeFavorite, favorites, setForecast, forecast } = useWeatherStore(); 

  // Функция для обновления предложений городов
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCity(input);

    if (input.length >= 3) { // Запрос срабатывает только если введено более 2 символов
      try {
        const fetchedCities = await fetchCities(input);
        setSuggestions(fetchedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Выбор города из списка предложений
  const handleCityClick = (selectedCity: CitySuggestion) => {
    setCity(`${selectedCity.name}, ${selectedCity.country}`);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const weatherData: WeatherData = await getWeatherByCity(city);  
      const forecastData: ForecastData = await getForecastByCity(city); 
      setWeather(weatherData); 
      setForecast(forecastData, city);  
    } catch {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (city: string) => favorites.includes(city);

  return (
    <div className={`container ${styles.searchWeather}`}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Подсказка для пользователя */}
      <p className="text-muted">Please enter the city name in English. The first letter should be capitalized.</p>

      {/* Выпадающий список с предложениями городов */}
      {suggestions.length > 0 && (
        <ul className="list-group mb-3">
          {suggestions.map((suggestion) => (
            <li
              key={`${suggestion.lat}-${suggestion.lon}`}
              className="list-group-item list-group-item-action"
              onClick={() => handleCityClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-danger">{error}</p>}

      {weather && (
        <div className="mt-4">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>

          <div className="d-flex gap-2 mt-3">
            {isFavorite(weather.name) ? (
              <button className="btn btn-danger" onClick={() => removeFavorite(weather.name)}>
                Remove from Favorites
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={() => addFavorite(weather.name)}>
                Add to Favorites
              </button>
            )}

            {forecast && forecast.city.name === weather.name ? (
              <Link href={`/forecast/${weather.name}`}>
                <button className="btn btn-primary">View Forecast</button>
              </Link>
            ) : (
              <button className="btn btn-secondary" disabled>
                View Forecast
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWeather;
