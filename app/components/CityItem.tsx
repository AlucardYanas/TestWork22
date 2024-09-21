'use client';

import React from 'react';
import styles from '../styles/favorites.module.scss';
import { WeatherData } from '../types/weather'; 

interface CityItemProps {
  city: string;
  weatherData?: WeatherData; 
  removeFavorite: (city: string) => void;
}

const CityItem = React.memo(({ city, weatherData, removeFavorite }: CityItemProps) => {
  return (
    <li className={`card ${styles.cityCard}`}>
      <div className="card-body">
        <h5 className="card-title">{city}</h5>
        {weatherData ? (
          <>
            <p className="card-text">
              <strong>Temperature:</strong> {weatherData.main.temp}°C<br />
              <strong>Weather:</strong> {weatherData.weather[0].description}<br />
              <strong>Pressure:</strong> {weatherData.main.pressure} hPa<br />
              <strong>Humidity:</strong> {weatherData.main.humidity}%
            </p>
          </>
        ) : (
          <p>Loading weather data...</p> // Отображаем сообщение, если данные еще загружаются
        )}
        <button
          onClick={() => removeFavorite(city)}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      </div>
    </li>
  );
});

CityItem.displayName = "CityItem";

export default CityItem;
