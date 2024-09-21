'use client';

import { useWeatherStore } from '../store/weatherStore';
import styles from '../styles/favorites.module.scss'; 

const Favorites = () => {
  const { favorites, removeFavorite } = useWeatherStore();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Favorite Cities</h2>
      {favorites.length > 0 ? (
        <ul className={styles.favoriteList}>
          {favorites.map((city) => (
            <li key={city}>
              <span>{city}</span>
              <button
                onClick={() => removeFavorite(city)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite cities yet</p>
      )}
    </div>
  );
};

export default Favorites;
