import { SafeView } from '@/components/layout/SafeView';
import { useWeatherContext } from '@/providers/WeatherProvider';
import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather';
import { WeatherTable } from '@/components/WeatherTable/WeatherTable';

export default function HomeScreen() {
  const { weather, isLoading } = useWeatherContext();

  return (
    <SafeView>
      <CurrentWeather weather={weather[0]?.entries[0]} isLoading={isLoading} />
      <WeatherTable weatherData={weather} />
    </SafeView>
  );
}
