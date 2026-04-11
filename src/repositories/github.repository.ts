/* ============================================================
   GitHub — Repository
   Owns caching and exposes domain models to the store.
   ============================================================ */

import { fetchGitHubRepos } from '@/services/github.service';
import { mapRepoToDomain } from '@/data/mappers/github.mapper';
import type { GitHubRepoDomain } from '@/data/models/github.model';

let _cache: GitHubRepoDomain[] | null = null;

export const githubRepository = {
  async getRepos(): Promise<GitHubRepoDomain[]> {
    if (_cache) return _cache;
    const dtos = await fetchGitHubRepos();
    _cache = dtos.map(mapRepoToDomain);
    return _cache;
  },

  clearCache() {
    _cache = null;
  },
};
