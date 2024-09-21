'use client';

import { useState, useEffect } from 'react';
import { getForecastByCity } from '../lib/weatherAPI';
import styles from '../styles/forecast.module.scss'; 
import type { ForecastData } from '../types/forecast';
import { useWeatherStore } from '../store/weatherStore'; 

const Forecast = ({ city }: { city: string }) => {
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 
  const { forecast, setForecast } = useWeatherStore();

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError('');
      try {
        if (!forecast || forecast.city.name !== city) {
          const data: ForecastData = await getForecastByCity(city);
          setForecast(data, city); 
        }
      } catch {
        setError('Forecast not found');
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [city, forecast, setForecast]);


  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className={styles.forecastTitle}>Forecast for {city}</h2>
      <div className="row">
        {forecast?.list.slice(0, 5).map((item) => (
          <div key={item.dt} className="col-md-4 mb-3">
            <div className={`card ${styles.forecastCard}`}>
              <div className="card-body">
                <h5 className="card-title">
                  {new Date(item.dt * 1000).toLocaleDateString()}
                </h5>
                <p><strong>Temperature:</strong> {item.main.temp}°C</p>
                <p><strong>Weather:</strong> {item.weather[0].description}</p>
                <p><strong>Pressure:</strong> {item.main.pressure} hPa</p>
                <p><strong>Humidity:</strong> {item.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> {item.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
