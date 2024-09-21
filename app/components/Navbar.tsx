import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();

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
            <li className={`nav-item ${router.pathname === '/forecast' ? 'active' : ''}`}>
              <Link href="/forecast" className="nav-link">
                Forecast
              </Link>
            </li>
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
