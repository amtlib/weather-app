import { z } from 'zod';
import dayjs from 'dayjs';
import { WeatherApiResponse } from './weatherapi.types';

// Define the types
export interface WeatherEntry {
  time: dayjs.Dayjs;
  pressure: number;
  temperature: number;
  humidity: number;
  windDirection: number;
  windSpeed: number;
  symbolCode: string | undefined;
}

export type WeatherCollection = {
  time: dayjs.Dayjs;
  entries: WeatherEntry[];
}[];

// Define Zod schemas
const MetaSchema = z.object({
  updated_at: z.string(),
  units: z.object({
    air_pressure_at_sea_level: z.string(),
    air_temperature: z.string(),
    cloud_area_fraction: z.string(),
    precipitation_amount: z.string(),
    relative_humidity: z.string(),
    wind_from_direction: z.string(),
    wind_speed: z.string(),
  }),
});

const InstantDetailsSchema = z.object({
  air_pressure_at_sea_level: z.number(),
  air_temperature: z.number(),
  cloud_area_fraction: z.number(),
  relative_humidity: z.number(),
  wind_from_direction: z.number(),
  wind_speed: z.number(),
});

const SummarySchema = z
  .object({
    symbol_code: z.string(),
  })
  .optional();

const DetailsSchema = z
  .object({
    precipitation_amount: z.number().optional(),
  })
  .optional();

const ForecastPeriodSchema = z.object({
  time: z.string(),
  data: z.object({
    instant: z.object({
      details: InstantDetailsSchema,
    }),
    next_12_hours: z
      .object({
        summary: SummarySchema,
        details: z.record(z.any()).optional(),
      })
      .optional(),
    next_1_hours: z
      .object({
        summary: SummarySchema,
        details: DetailsSchema,
      })
      .optional(),
    next_6_hours: z
      .object({
        summary: SummarySchema,
        details: DetailsSchema,
      })
      .optional(),
  }),
});

const PropertiesSchema = z.object({
  meta: MetaSchema,
  timeseries: z.array(ForecastPeriodSchema),
});

const WeatherApiResponseSchema = z.object({
  type: z.literal('Feature'),
  geometry: z.record(z.any()), // or more specific schema if available
  properties: PropertiesSchema,
});

// Validate the data
export const validateWeatherApiResponse = (
  data: unknown,
): data is WeatherApiResponse => {
  try {
    WeatherApiResponseSchema.parse(data);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
