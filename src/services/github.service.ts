/* ============================================================
   GitHub — Service (HTTP layer)
   Fetches raw DTOs from the GitHub API via the shared apiService.
   ============================================================ */

import { apiService } from '@/core/api/apiService';
import type { GitHubRepoDTO } from '@/data/dtos/github.dto';

const GITHUB_USERNAME = 'CharlyMech';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

export async function fetchGitHubRepos(): Promise<GitHubRepoDTO[]> {
  const result = await apiService.get<GitHubRepoDTO[]>(GITHUB_API);
  if (result.error || !result.data) return [];
  return result.data;
}
