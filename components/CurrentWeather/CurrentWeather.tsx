import { WeatherEntry } from "@/providers/WeatherProvider";
import { ReactNode } from "react";
import { View } from "react-native";
import { StyleSheet } from 'react-native';
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import styled from "styled-components";

const Icon = styled(View)`

`;

export const CurrentWeather = ({ weather }: { weather: WeatherEntry}): ReactNode => {
    return (<ThemedView style={styles.container}>
        <ThemedText>{weather?.temperature}°C</ThemedText>
    </ThemedView>)
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10
    }
})