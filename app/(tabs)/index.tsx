import { CurrentWeather } from '@/src/components/CurrentWeather/CurrentWeather';
import { WeatherTable } from '@/src/components/WeatherTable/WeatherTable';
import { SafeView } from '@/src/components/layout/SafeView';
import { useWeatherContext } from '@/src/providers/WeatherProvider';

export default function HomeScreen() {
  const { weather, isLoading } = useWeatherContext();

  return (
    <SafeView>
      <CurrentWeather weather={weather[0]?.entries[0]} isLoading={isLoading} />
      <WeatherTable weatherData={weather} />
    </SafeView>
  );
}
