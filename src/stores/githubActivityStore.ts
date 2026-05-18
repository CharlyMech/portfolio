import { create } from 'zustand';
import { fetchGitHubActivity } from '@/core/services/githubService';
import type { GitHubActivityData } from '@/core/models/github';

interface GitHubActivityState {
  data: GitHubActivityData | null;
  /** True while the initial (or in-flight) GraphQL request is running */
  loading: boolean;
  /** True after the first fetch attempt has finished (success or failure) */
  fetched: boolean;
  fetch: () => Promise<void>;
}

export const useGitHubActivityStore = create<GitHubActivityState>()((set, get) => ({
  data: null,
  loading: false,
  fetched: false,

  fetch: async () => {
    if (get().fetched || get().loading) return;
    set({ loading: true });
    try {
      const data = await fetchGitHubActivity();
      set({ data, loading: false, fetched: true });
    } catch {
      set({ loading: false, fetched: true });
    }
  },
}));
