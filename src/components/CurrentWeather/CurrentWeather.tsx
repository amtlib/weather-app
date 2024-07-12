import { ReactNode } from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { WeatherEntry } from '@/src/api/validators/weatherapi.validator';
import {
  formatHumidity,
  formatPrecipitation,
  formatPressure,
  formatTemperature,
  formatWindSpeed,
} from '@/src/constants/Units';
import { getWeatherIcon } from '@/assets/images/weather';
import { useLocationContext } from '@/src/providers/LocationProvider';

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
    <ThemedView className="p-5 mx-2 my-5 flex-col flex rounded-xl bg-slate-300">
      <ThemedView className="mb-10">
        <ThemedText type="title" style={{ textAlign: 'center' }}>
          {city}, {country}
        </ThemedText>
      </ThemedView>
      <View style={styles.topSection}>
        <Image
          style={styles.icon}
          source={getWeatherIcon(weather.symbolCode)}
        />
        <View>
          <ThemedText type="title">
            {formatTemperature(weather.temperature)}
          </ThemedText>
          <ThemedText type="subtitle" className="text-center mt-2">
            {formatPrecipitation(weather.precipitation)}
          </ThemedText>
        </View>
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
  icon: {
    width: 100,
    height: 100,
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
