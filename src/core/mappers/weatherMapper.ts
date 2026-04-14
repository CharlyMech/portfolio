import type { WeatherResponseDto } from '@/core/dtos/weatherDto';
import type { WeatherDomain, WeatherCondition } from '@/core/models/weather';

/** WMO Weather interpretation codes → condition + label */
function mapWmoCode(code: number, isDay: boolean): { condition: WeatherCondition; label: string } {
  if (code === 0) return { condition: 'clear', label: isDay ? 'Clear sky' : 'Clear night' };
  if (code <= 2) return { condition: 'partly_cloudy', label: 'Partly cloudy' };
  if (code === 3) return { condition: 'cloudy', label: 'Overcast' };
  if (code <= 49) return { condition: 'foggy', label: 'Foggy' };
  if (code <= 57) return { condition: 'drizzle', label: 'Drizzle' };
  if (code <= 67) return { condition: 'rain', label: 'Rain' };
  if (code <= 77) return { condition: 'snow', label: 'Snow' };
  if (code <= 82) return { condition: 'rain', label: 'Rain showers' };
  if (code <= 86) return { condition: 'snow', label: 'Snow showers' };
  return { condition: 'thunderstorm', label: 'Thunderstorm' };
}

function getLocalTime(timezone: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '--:--:--';
  }
}

export function mapWeatherToDomain(dto: WeatherResponseDto): WeatherDomain {
  const isDay = dto.current.is_day === 1;
  const { condition, label } = mapWmoCode(dto.current.weather_code, isDay);

  return {
    temperatureC: Math.round(dto.current.temperature_2m),
    condition,
    conditionLabel: label,
    windKph: Math.round(dto.current.wind_speed_10m),
    isDay,
    timezone: dto.timezone,
    localTime: getLocalTime(dto.timezone),
    fetchedAt: new Date(),
  };
}
