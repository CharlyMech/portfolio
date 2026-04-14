/* ============================================================
   GitHub — Zustand store
   ============================================================ */

import { create } from 'zustand';
import { githubRepository } from '@/core/repositories/github';
import type { GitHubRepoDomain } from '@/core/models/github';

interface GitHubStore {
  repos: GitHubRepoDomain[];
  loading: boolean;
  error: string | null;
  fetchRepos: () => Promise<void>;
}

export const useGitHubStore = create<GitHubStore>((set) => ({
  repos: [],
  loading: false,
  error: null,

  fetchRepos: async () => {
    set({ loading: true, error: null });
    try {
      const repos = await githubRepository.getRepos();
      set({ repos, loading: false });
    } catch {
      set({ error: 'Failed to load repos', loading: false });
    }
  },
}));
