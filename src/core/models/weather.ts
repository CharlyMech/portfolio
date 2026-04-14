export type WeatherCondition =
  | 'clear'
  | 'partly_cloudy'
  | 'cloudy'
  | 'foggy'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm';

export interface WeatherDomain {
  temperatureC: number;
  condition: WeatherCondition;
  conditionLabel: string;
  windKph: number;
  isDay: boolean;
  /** ISO timezone string e.g. "Europe/Madrid" */
  timezone: string;
  /** Formatted local time string HH:MM */
  localTime: string;
  fetchedAt: Date;
}
