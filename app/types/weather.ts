export interface WeatherData {
  name: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}
