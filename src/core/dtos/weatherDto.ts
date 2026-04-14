export interface WeatherCurrentDto {
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  is_day: 0 | 1;
}

export interface WeatherResponseDto {
  latitude: number;
  longitude: number;
  timezone: string;
  current: WeatherCurrentDto;
}
