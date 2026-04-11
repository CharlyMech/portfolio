/* ============================================================
   Weather — Repository
   Caches the last fetch; only refetches after TTL expires.
   ============================================================ */

import { fetchWeather } from '@/services/weather.service';
import { mapWeatherToDomain } from '@/data/mappers/weather.mapper';
import type { WeatherDomain } from '@/data/models/weather.model';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

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
