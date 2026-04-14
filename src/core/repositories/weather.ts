import { fetchWeather } from '@/core/services/weatherService';
import { mapWeatherToDomain } from '@/core/mappers/weatherMapper';
import type { WeatherDomain } from '@/core/models/weather';

const CACHE_TTL_MS = 5 * 60 * 1000;

let cache: WeatherDomain | null = null;

export const weatherRepository = {
  async getWeather(): Promise<WeatherDomain | null> {
    if (cache && Date.now() - cache.fetchedAt.getTime() < CACHE_TTL_MS) {
      return cache;
    }
    const dto = await fetchWeather();
    if (!dto) return cache; // return stale data on error rather than null
    cache = mapWeatherToDomain(dto);
    return cache;
  },

  clearCache() {
    cache = null;
  },
};
