import { ReactNode } from 'react';
import { View, Image } from 'react-native';
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
import { styled } from 'nativewind';

const StyledImage = styled(Image);

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
      <ThemedView className="flex flex-row items-center justify-between">
        <StyledImage
          className="w-28 h-28"
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
      </ThemedView>
      <ThemedView className="flex flex-row mt-5 justify-between">
        <ThemedText>{formatHumidity(weather.humidity)}</ThemedText>
        <ThemedText>{formatPressure(weather.pressure)}</ThemedText>
        <ThemedText>{formatWindSpeed(weather.windSpeed)}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};
