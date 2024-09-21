'use client';

import Forecast from '../../components/Forecast';
import { useWeatherStore } from '../../store/weatherStore';

const ForecastPage = ({ params }: { params: { city: string } }): React.ReactElement => {
  const { city } = params;  
  const { forecast } = useWeatherStore(); // Достаем прогноз из состояния

  if (!forecast || forecast.city.name !== city) {
    return <p>No forecast available for {city}. Please search for the city first.</p>;
  }

  return (
    <div>
      <Forecast city={city} /> 
    </div>
  );
};

export default ForecastPage;
