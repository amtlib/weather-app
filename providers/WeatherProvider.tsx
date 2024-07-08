import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Location from "expo-location";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

const getWeatherEndpoint = (location: Location.LocationObject) => {
  return `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.coords.latitude}&lon=${location.coords.longitude}`;
};

interface WeatherContextType {
  location: Location.LocationObject | undefined;
  weather: WeatherEntry[];
}

export interface WeatherEntry {
  time: Dayjs;
  pressure: number;
  temperature: number;
  humidity: number;
  windDirection: number;
  windSpeed: number;
  symbolCode: string | undefined;
}

const mapApiDataToWeatherEntries = (apiData: any): WeatherEntry[] => {
  return apiData.properties.timeseries
    .map((timeseries) => {
      const details = timeseries.data.instant.details;
      const time = dayjs(timeseries.time);
      if (time < dayjs()) return undefined;

      return {
        time: time,
        pressure: details.air_pressure_at_sea_level,
        temperature: details.air_temperature,
        humidity: details.relative_humidity,
        windDirection: details.wind_from_direction,
        windSpeed: details.wind_speed,
        symbolCode: timeseries.data.next_1_hours?.summary.symbol_code,
      };
    })
    .filter((e) => e !== undefined);
};

const WeatherContext = createContext<WeatherContextType>({
  location: undefined,
  weather: [],
});

export const WeatherProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = useState<
    Location.LocationObject | undefined
  >();
  const [weather, setWeather] = useState<WeatherEntry[]>([]);

  const getWeather = useCallback(async () => {
    if (!location) return;
    const { data } = await axios.get(getWeatherEndpoint(location), {
      headers: { "User-Agent": "grzegorz.pach@protonmail.com" },
    });

    setWeather(mapApiDataToWeatherEntries(data));
    console.log(mapApiDataToWeatherEntries(data));
  }, [location]);

  const getLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocation(undefined);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getWeather();
  }, [location]);
  const value = useMemo(
    () => ({
      location,
      weather,
    }),
    [location, weather],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("WeatherContext must be used in WeatherProvider");
  }
  return context;
};
