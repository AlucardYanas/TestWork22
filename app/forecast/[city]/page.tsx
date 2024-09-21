import Forecast from '../../components/Forecast';

const ForecastPage = ({ params }: { params: { city: string } }) => {
  const { city } = params;  

  return (
    <div>
      <Forecast city={city} /> 
    </div>
  );
};

export default ForecastPage;
