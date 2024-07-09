import { ReactNode } from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { WeatherEntry } from '@/api/validators/weatherapi.validator';
import {
  formatHumidity,
  formatPressure,
  formatWindSpeed,
} from '@/constants/Units';
import { getWeatherIcon } from '@/assets/images/weather';
import { useLocationContext } from '@/providers/LocationProvider';

export const CurrentWeather = ({
  weather,
  isLoading,
}: {
  weather?: WeatherEntry;
  isLoading?: boolean;
}): ReactNode => {
  const { city, country } = useLocationContext();
  if (isLoading || !weather) return <></>;
  return (
    <ThemedView style={styles.container}>
      <View style={styles.locationSection}>
        <ThemedText type="title" style={{ textAlign: 'center' }}>
          {city}, {country}
        </ThemedText>
      </View>
      <View style={styles.topSection}>
        <Image
          style={styles.icon}
          source={getWeatherIcon(weather.symbolCode)}
        />
        <ThemedText type="title">{weather?.temperature}°C</ThemedText>
      </View>
      <View style={styles.details}>
        <ThemedText>{formatHumidity(weather.humidity)}</ThemedText>
        <ThemedText>{formatPressure(weather.pressure)}</ThemedText>
        <ThemedText>{formatWindSpeed(weather.windSpeed)}</ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  locationSection: {
    marginBottom: 20,
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
});
