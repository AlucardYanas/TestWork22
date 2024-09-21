'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherStore } from '../store/weatherStore';
import styles from '../styles/favorites.module.scss';
import CityItem from './CityItem';
import { WeatherData } from '../types/weather'; 
import { getWeatherByCity } from '../lib/weatherAPI'; 

const Favorites = (): React.ReactElement => {
  const { favorites, removeFavorite } = useWeatherStore();
  const [weatherDataForCities, setWeatherDataForCities] = useState<{ [city: string]: WeatherData }>({});


  useEffect(() => {
    const fetchWeatherData = async () => {
      const results: { [city: string]: WeatherData } = {};

      
      for (const city of favorites) {
        try {
          const data = await getWeatherByCity(city);
          results[city] = data;
        } catch (error) {
          console.error(`Error fetching weather data for ${city}:`, error);
        }
      }

      setWeatherDataForCities(results); 
    };

    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Favorite Cities</h2>
      {favorites.length > 0 ? (
        <ul className={styles.favoriteList}>
          {favorites.map((city: string) => (
            <CityItem
              key={city}
              city={city}
              weatherData={weatherDataForCities[city]} 
              removeFavorite={removeFavorite}
            />
          ))}
        </ul>
      ) : (
        <p>No favorite cities yet</p>
      )}
    </div>
  );
};

export default React.memo(Favorites);
