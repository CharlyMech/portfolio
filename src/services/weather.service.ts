/* ============================================================
   Weather — Service (HTTP layer)
   Uses Open-Meteo (free, no API key required).
   ============================================================ */

import { apiService } from '@/core/api/apiService';
import type { WeatherResponseDTO } from '@/data/dtos/weather.dto';

// Valladolid, Spain
const LAT = 41.6523;
const LON = -4.7245;

const WEATHER_API =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,weather_code,wind_speed_10m,is_day` +
  `&timezone=Europe%2FMadrid` +
  `&forecast_days=1`;

export async function fetchWeather(): Promise<WeatherResponseDTO | null> {
  const result = await apiService.get<WeatherResponseDTO>(WEATHER_API);
  if (result.error || !result.data) return null;
  return result.data;
}
