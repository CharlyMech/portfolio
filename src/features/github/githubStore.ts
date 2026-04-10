/* ============================================================
   FEATURE: GitHub — Full data-flow layer
   Service → DTO → Mapper → Domain → Repository → Store → UI
   ============================================================ */

import { apiService } from '@/core/api/apiService';
import type { GitHubRepoDTO, GitHubRepoDomain } from '@/types';
import { create } from 'zustand';

// ---- CONFIG ----
const GITHUB_USERNAME = 'carlos-dev'; // Replace with real username
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

// ---- MAPPER: DTO → Domain ----
function mapRepoToDomain(dto: GitHubRepoDTO): GitHubRepoDomain {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description ?? 'No description',
    url: dto.html_url,
    stars: dto.stargazers_count,
    language: dto.language ?? 'Unknown',
    topics: dto.topics ?? [],
    updatedAt: new Date(dto.updated_at),
  };
}

// ---- SERVICE ----
async function fetchGitHubRepos(): Promise<GitHubRepoDomain[]> {
  const result = await apiService.get<GitHubRepoDTO[]>(GITHUB_API);
  if (result.error || !result.data) return [];
  return result.data.map(mapRepoToDomain);
}

// ---- REPOSITORY ----
let _cache: GitHubRepoDomain[] | null = null;

export const githubRepository = {
  async getRepos(): Promise<GitHubRepoDomain[]> {
    if (_cache) return _cache;
    const repos = await fetchGitHubRepos();
    _cache = repos;
    return repos;
  },
};

// ---- STORE (Zustand) ----
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
    } catch (err) {
      set({ error: 'Failed to load repos', loading: false });
    }
  },
}));
