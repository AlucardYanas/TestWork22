export interface ForecastData {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number; 
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
  }[];
}
