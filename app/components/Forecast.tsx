'use client';

import { useState, useEffect } from 'react';
import { getForecastByCity } from '../lib/weatherAPI';
import styles from '../styles/forecast.module.scss'; 
import type { ForecastData } from '../types/forecast';
import { useWeatherStore } from '../store/weatherStore'; // Используем Zustand для хранения данных

const Forecast = ({ city }: { city: string }) => {
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 
  const { forecast, setForecast } = useWeatherStore(); // Достаем прогноз и функцию сохранения из глобального состояния

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError('');
      try {
        if (!forecast || forecast.city.name !== city) {
          const data: ForecastData = await getForecastByCity(city); // Загружаем данные, если нет сохраненного прогноза
          setForecast(data, city);  // Сохраняем данные прогноза в Zustand
        }
      } catch {
        setError('Forecast not found');
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [city, forecast, setForecast]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className={styles.forecastTitle}>Forecast for {city}</h2>
      {forecast && (
        <ul className={styles.forecastList}>
          {forecast.list.slice(0, 5).map((item) => (
            <li key={item.dt}>
              <span>{new Date(item.dt * 1000).toLocaleDateString()}</span>
              <span>{item.weather[0].description}</span>
              <span>{item.main.temp}°C</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Forecast;
