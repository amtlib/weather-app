import React from 'react';
import { SectionList } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import {
  formatHumidity,
  formatPrecipitation,
  formatPressure,
  formatTemperature,
  formatWindSpeed,
} from '@/src/constants/Units';
import { WeatherCollection } from '@/src/providers/WeatherProvider';

const cellClassName = 'py-5 text-center flex-nowrap';

export const WeatherTable = ({
  weatherData,
}: {
  weatherData: WeatherCollection;
}) => {
  const sections = weatherData.map((day) => ({
    title: day.time.format('YYYY-MM-DD'),
    data: day.entries,
  }));

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.time.toString()}
      stickySectionHeadersEnabled
      renderSectionHeader={({ section: { title } }) => (
        <ThemedView className="px-5 py-2 bg-slate-300">
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </ThemedView>
      )}
      renderItem={({ item }) => (
        <ThemedView className="flex flex-row justify-between w-max px-5">
          <ThemedText className={cellClassName}>
            {item.time.format('HH:mm')}
          </ThemedText>
          <ThemedText className={cellClassName}>
            {formatTemperature(item.temperature)}
          </ThemedText>
          <ThemedText className={cellClassName}>
            {formatPressure(item.pressure)}
          </ThemedText>
          <ThemedText className={cellClassName}>
            {formatHumidity(item.humidity)}
          </ThemedText>
          <ThemedText className={cellClassName}>
            {formatWindSpeed(item.windSpeed)}
          </ThemedText>
          <ThemedText className={cellClassName}>
            {formatPrecipitation(item.precipitation)}
          </ThemedText>
        </ThemedView>
      )}
      ListEmptyComponent={() => (
        <ThemedText>No weather data available</ThemedText>
      )}
    />
  );
};
