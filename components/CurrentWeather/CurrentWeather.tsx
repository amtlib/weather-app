import { WeatherEntry } from "@/providers/WeatherProvider";
import { ReactNode } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import styled from "styled-components";

export const CurrentWeather = ({
  weather,
}: {
  weather: WeatherEntry;
}): ReactNode => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.topSection}>
    <View style={styles.icon} />
        <ThemedText type="title">{weather?.temperature}°C</ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 75,
    height: 75,
    backgroundColor: "red",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
