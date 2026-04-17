import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { fetchContributionsForYear } from '@/core/services/githubService';
import type { GitHubContributionDay } from '@/core/models/github';

export const GITHUB_ACCOUNT_START_YEAR = 2020;

interface ContributionsStore {
  byYear: Record<number, GitHubContributionDay[]>;
  loadingYear: number | null;
  fetchYear: (year: number) => Promise<void>;
}

export const useContributionsStore = create<ContributionsStore>()(
  persist(
    (set, get) => ({
      byYear: {},
      loadingYear: null,

      fetchYear: async (year) => {
        if (get().byYear[year]) return; // cache hit
        set({ loadingYear: year });
        try {
          const days = await fetchContributionsForYear(year);
          set((s) => ({
            byYear: { ...s.byYear, [year]: days },
            loadingYear: null,
          }));
        } catch {
          set({ loadingYear: null });
        }
      },
    }),
    {
      name: 'gh_contributions',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
