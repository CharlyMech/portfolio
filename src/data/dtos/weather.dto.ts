/* ============================================================
   Weather — DTO (raw Open-Meteo API response shape)
   https://open-meteo.com/en/docs
   ============================================================ */

export interface WeatherCurrentDTO {
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  is_day: 0 | 1;
}

export interface WeatherResponseDTO {
  latitude: number;
  longitude: number;
  timezone: string;
  current: WeatherCurrentDTO;
}
