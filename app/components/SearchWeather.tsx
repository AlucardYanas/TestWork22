'use client';

import { useState } from 'react';
import { getWeatherByCity, getForecastByCity } from '../lib/weatherAPI';
import { useWeatherStore } from '../store/weatherStore';
import Link from 'next/link';
import styles from '../styles/searchWeather.module.scss'; 
import { WeatherData } from '../types/weather'; 
import { ForecastData } from '../types/forecast'; 

const SearchWeather = () => {
  const [city, setCity] = useState<string>(''); 
  const [weather, setWeather] = useState<WeatherData | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 

  const { addFavorite, removeFavorite, favorites, setForecast, forecast } = useWeatherStore(); // Достаем forecast из глобального состояния

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const weatherData: WeatherData = await getWeatherByCity(city);  
      const forecastData: ForecastData = await getForecastByCity(city); 
      setWeather(weatherData); 
      setForecast(forecastData, city);  // Сохраняем данные прогноза в глобальном состоянии
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
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {weather && (
        <div className="mt-4">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>

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

            {/* Делаем ссылку на прогноз активной только если прогноз загружен */}
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
