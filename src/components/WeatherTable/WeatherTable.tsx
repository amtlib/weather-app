import React from 'react';
import { StyleSheet, SectionList } from 'react-native';
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
        <ThemedView style={styles.stickyTitle}>
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </ThemedView>
      )}
      renderItem={({ item }) => (
        <ThemedView style={styles.tableRow}>
          <ThemedText style={styles.cell}>
            {item.time.format('HH:mm')}
          </ThemedText>
          <ThemedText style={styles.cell}>
            {formatTemperature(item.temperature)}
          </ThemedText>
          <ThemedText style={styles.cell}>
            {formatPressure(item.pressure)}
          </ThemedText>
          <ThemedText style={styles.cell}>
            {formatHumidity(item.humidity)}
          </ThemedText>
          <ThemedText style={styles.cell}>
            {formatWindSpeed(item.windSpeed)}
          </ThemedText>
          <ThemedText style={styles.cell}>
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

const styles = StyleSheet.create({
  stickyTitle: {
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    padding: 10,
    textAlign: 'center',
    flexWrap: 'nowrap',
  },
});
