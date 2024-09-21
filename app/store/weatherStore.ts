'use client';

import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { ForecastData } from '../types/forecast';

interface WeatherState {
  favorites: string[];
  forecast: ForecastData | null;
  city: string | null;
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  setForecast: (forecast: ForecastData, city: string) => void;
  clearForecast: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      favorites: [],
      forecast: null,
      city: null,
      addFavorite: (city: string) =>
        set((state) => ({
          favorites: [...state.favorites, city],
        })),
      removeFavorite: (city: string) =>
        set((state) => ({
          favorites: state.favorites.filter((favCity) => favCity !== city),
        })),
      setForecast: (forecast, city) =>
        set(() => ({
          forecast,
          city,
        })),
      clearForecast: () =>
        set(() => ({
          forecast: null,
          city: null,
        })),
    }),
    {
      name: 'weather-storage',
    }
  )
);
