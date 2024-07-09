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

interface LocationContextType {
  location: Location.LocationObject | undefined;
}

const LocationContext = createContext<LocationContextType>({
  location: undefined,
});

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = useState<Location.LocationObject | undefined>(
    undefined,
  );

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

  const value = useMemo(
    () => ({
      location,
    }),
    [location],
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
