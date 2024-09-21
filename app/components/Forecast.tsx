'use client';

import { useState, useEffect } from 'react';
import { getForecastByCity } from '../lib/weatherAPI';
import styles from '../styles/forecast.module.scss'; // Подключаем SCSS-модуль

const Forecast = ({ city }: { city: string }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getForecastByCity(city);
        setForecast(data);
      } catch (err) {
        setError('Forecast not found');
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [city]);

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
