import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface WeatherState {
  favorites: string[];
  forecast: string| null;
  city: string | null;
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  setForecast: (forecast: string, city: string) => void;
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
