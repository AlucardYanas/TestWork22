import 'bootstrap/dist/css/bootstrap.min.css';

import SearchWeather from './components/SearchWeather';
import styles from './styles/page.module.scss'; 

const HomePage = () => {
  return (
    <div className={styles.page}>
      <main className={`container ${styles.main}`}>
        <h1 className="display-4">Weather App</h1>
        <SearchWeather />
      </main>
    </div>
  );
};

export default HomePage;

