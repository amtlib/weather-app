type Meta = {
  updated_at: string;
  units: {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    cloud_area_fraction: string;
    precipitation_amount: string;
    relative_humidity: string;
    wind_from_direction: string;
    wind_speed: string;
  };
};

type InstantDetails = {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
};

type Summary = {
  symbol_code: string;
};

type ForecastPeriod = {
  time: string;
  data: {
    instant: {
      details: InstantDetails;
    };
    next_12_hours?: {
      summary: Summary;
      details?: Record<string, unknown>;
    };
    next_1_hours?: {
      summary: Summary;
      details?: {
        precipitation_amount: number;
      };
    };
    next_6_hours?: {
      summary: Summary;
      details?: {
        precipitation_amount: number;
      };
    };
  };
};

type Properties = {
  meta: Meta;
  timeseries: ForecastPeriod[];
};

export type WeatherApiResponse = {
  type: string;
  geometry: Record<string, unknown>;
  properties: Properties;
};
