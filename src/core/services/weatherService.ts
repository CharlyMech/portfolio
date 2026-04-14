import { apiService } from '@/core/services/apiService';
import type { WeatherResponseDto } from '@/core/dtos/weatherDto';
import { PROFILE } from '@/constants/profile';

const { lat, lon } = PROFILE.location.coordinates;

const WEATHER_API =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${lat}&longitude=${lon}` +
  `&current=temperature_2m,weather_code,wind_speed_10m,is_day` +
  `&timezone=Europe%2FMadrid` +
  `&forecast_days=1`;

export async function fetchWeather(): Promise<WeatherResponseDto | null> {
  const result = await apiService.get<WeatherResponseDto>(WEATHER_API);
  if (result.error || !result.data) return null;
  return result.data;
}
