import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

interface LocationContextType extends LocationDescription {
  location: Location.LocationObject | undefined;
}

interface LocationDescription {
  city: string | undefined;
  country: string | undefined;
}

const LocationContext = createContext<LocationContextType>({
  location: undefined,
  city: undefined,
  country: undefined,
});

const getCityAndCountry = async (
  latitude: number,
  longitude: number,
): Promise<LocationDescription | null> => {
  try {
    const response = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          q: `${latitude}+${longitude}`,
          key: process.env.GEOLOCATION_API_KEY,
        },
      },
    );

    const results = response.data.results;

    if (results && results.length > 0) {
      const result = results[0];
      const city =
        result.components.city ||
        result.components.town ||
        result.components.village ||
        '';
      const country = result.components.country || '';
      return { city, country };
    } else {
      console.error('No results found for the provided coordinates.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
};

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = useState<Location.LocationObject | undefined>(
    undefined,
  );
  const [city, setCity] = useState<string | undefined>();
  const [country, setCountry] = useState<string | undefined>();

  const getLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocation(undefined);
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    (async () => {
      if (location?.coords.latitude && location.coords.longitude) {
        const locationData = await getCityAndCountry(
          location.coords.latitude,
          location.coords.longitude,
        );
        setCity(locationData?.city);
        setCountry(locationData?.country);
      }
    })();
  }, [location]);

  const value = useMemo(
    () => ({
      location,
      city,
      country,
    }),
    [location, city, country],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used in LocationProvider');
  }
  return context;
};
