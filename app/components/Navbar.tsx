import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWeatherStore } from '../store/weatherStore'; // Подключаем Zustand
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const { forecast } = useWeatherStore(); // Получаем прогноз из состояния

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`}>
      <div className="container">
        <Link href="/" className="navbar-brand">
          WeatherApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item ${router.pathname === '/' ? 'active' : ''}`}>
              <Link href="/" className="nav-link">
                Search Weather
              </Link>
            </li>

            {/* Проверяем, есть ли прогноз, и делаем ссылку активной только если прогноз загружен */}
            {forecast ? (
              <li className={`nav-item ${router.pathname === '/forecast' ? 'active' : ''}`}>
                <Link href="/forecast" className="nav-link">
                  Forecast
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <span className="nav-link disabled" aria-disabled="true">
                  Forecast (unavailable)
                </span>
              </li>
            )}

            <li className={`nav-item ${router.pathname === '/favorites' ? 'active' : ''}`}>
              <Link href="/favorites" className="nav-link">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
