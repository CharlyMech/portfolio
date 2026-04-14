/* ============================================================
   Weather Store — Zustand
   Triggers fetches via repository; refreshes every 5 minutes.
   ============================================================ */

import { create } from 'zustand';
import { weatherRepository } from '@/core/repositories/weather';
import type { WeatherDomain } from '@/core/models/weather';

interface WeatherState {
  weather: WeatherDomain | null;
  loading: boolean;
  error: string | null;
  /** Fetch (or serve from cache) and update store. */
  fetchWeather: () => Promise<void>;
  /**
   * Start auto-refresh every 5 minutes + update localTime every minute.
   * Returns a cleanup function — call it on component unmount.
   */
  startPolling: () => () => void;
}

export const useWeatherStore = create<WeatherState>()((set, get) => ({
  weather: null,
  loading: false,
  error: null,

  async fetchWeather() {
    set({ loading: true, error: null });
    try {
      const weather = await weatherRepository.getWeather();
      set({ weather, loading: false });
    } catch {
      set({ loading: false, error: 'Failed to fetch weather' });
    }
  },

  startPolling() {
    // Immediate fetch
    get().fetchWeather();

    // Refetch every 5 minutes (matches cache TTL)
    const fetchId = setInterval(() => {
      weatherRepository.clearCache();
      get().fetchWeather();
    }, 5 * 60 * 1000);

    // Tick localTime every minute without a full refetch
    const tickId = setInterval(() => {
      const { weather } = get();
      if (!weather) return;
      try {
        const localTime = new Intl.DateTimeFormat('en-GB', {
          timeZone: weather.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        set({ weather: { ...weather, localTime } });
      } catch { /* noop */ }
    }, 60 * 1000);

    return () => {
      clearInterval(fetchId);
      clearInterval(tickId);
    };
  },
}));
