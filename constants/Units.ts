export const Units = {
  temperature: '°C',
  humidity: '%',
  pressure: 'hPa',
  windSpeed: 'm/s',
};

export const formatTemperature = (temp: number) =>
  `${temp}${Units.temperature}`;

export const formatHumidity = (humidity: number) =>
  `${humidity}${Units.humidity}`;

export const formatPressure = (pressure: number) =>
  `${pressure} ${Units.pressure}`;

export const formatWindSpeed = (windSpeed: number) =>
  `${windSpeed} ${Units.windSpeed}`;
