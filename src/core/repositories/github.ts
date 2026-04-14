import { fetchGitHubRepos } from '@/core/services/githubService';
import { mapRepoToDomain } from '@/core/mappers/githubMapper';
import type { GitHubRepoDomain } from '@/core/models/github';

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
