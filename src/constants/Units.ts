export const Units = {
  temperature: '°C',
  humidity: '%',
  pressure: 'hPa',
  windSpeed: 'm/s',
  precipitation: 'mm',
};

export const formatTemperature = (temp: number) =>
  `${Math.round(temp)}${Units.temperature}`;

export const formatHumidity = (humidity: number) =>
  `${Math.round(humidity)}${Units.humidity}`;

export const formatPressure = (pressure: number) =>
  `${Math.round(pressure)} ${Units.pressure}`;

export const formatWindSpeed = (windSpeed: number) =>
  `${Math.round(windSpeed)} ${Units.windSpeed}`;

export const formatPrecipitation = (precipitation: number) =>
  `${precipitation}${Units.precipitation}`;
