import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeView } from '@/components/layout/SafeView';
import { useWeatherContext } from '@/providers/WeatherProvider';
import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather';

export default function HomeScreen() {
  const { weather } = useWeatherContext();

  return (
    <SafeView>
        <CurrentWeather weather={weather[0]} />
      <ScrollView>
        {weather.slice(1).map(entry => <ThemedText>{entry.time.format('DD/MM/YYYY HH:mm')} {entry.temperature}</ThemedText>)}
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
