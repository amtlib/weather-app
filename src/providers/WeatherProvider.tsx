import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import {
  WeatherEntry,
  validateWeatherApiResponse,
} from '@/src/api/validators/weatherapi.validator';
import { WeatherApiResponse } from '@/src/api/validators/weatherapi.types';
import * as Location from 'expo-location';
import { useLocationContext } from './LocationProvider';

const getWeatherEndpoint = (location: Location.LocationObject) => {
  return `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.coords.latitude}&lon=${location.coords.longitude}`;
};

interface WeatherContextType {
  weather: WeatherCollection;
  isLoading: boolean;
}

export type WeatherCollection = {
  time: Dayjs;
  entries: WeatherEntry[];
}[];

const groupWeatherByDay = (data: WeatherApiResponse): WeatherCollection => {
  const groupedWeather: { [date: string]: WeatherEntry[] } = {};

  data.properties.timeseries.forEach((entry) => {
    const entryTime = dayjs(entry.time);
    const entryDate = entryTime.format('YYYY-MM-DD');
    console.log(entry.data.next_1_hours?.details?.precipitation_amount);

    const weatherEntry: WeatherEntry = {
      time: entryTime,
      pressure: entry.data.instant.details.air_pressure_at_sea_level,
      temperature: entry.data.instant.details.air_temperature,
      humidity: entry.data.instant.details.relative_humidity,
      windDirection: entry.data.instant.details.wind_from_direction,
      windSpeed: entry.data.instant.details.wind_speed,
      symbolCode: entry.data.next_1_hours?.summary.symbol_code || undefined,
      precipitation:
        entry.data.next_1_hours?.details?.precipitation_amount || 0,
    };

    if (!groupedWeather[entryDate]) {
      groupedWeather[entryDate] = [];
    }
    groupedWeather[entryDate].push(weatherEntry);
  });

  return Object.keys(groupedWeather).map((date) => ({
    time: dayjs(date),
    entries: groupedWeather[date],
  }));
};

const WeatherContext = createContext<WeatherContextType>({
  weather: [],
  isLoading: true,
});

export const WeatherProvider = ({ children }: PropsWithChildren) => {
  const [weather, setWeather] = useState<WeatherCollection>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { location } = useLocationContext();

  const getWeather = useCallback(async () => {
    if (!location) return;
    setIsLoading(true);
    const { data } = await axios.get(getWeatherEndpoint(location), {
      headers: { 'User-Agent': 'grzegorz.pach@protonmail.com' },
    });

    const isResponseValid = validateWeatherApiResponse(data);
    if (isResponseValid) {
      setWeather(groupWeatherByDay(data));
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    getWeather();
  }, [location]);
  const value = useMemo(
    () => ({
      location,
      weather,
      isLoading,
    }),
    [location, weather, isLoading],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('WeatherContext must be used in WeatherProvider');
  }
  return context;
};
