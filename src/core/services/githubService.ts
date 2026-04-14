import { apiService } from '@/core/services/apiService';
import type { GitHubRepoDto } from '@/core/dtos/githubDto';
import { PROFILE } from '@/constants/profile';

const GITHUB_API = `https://api.github.com/users/${PROFILE.github.username}/repos?sort=updated&per_page=6`;

export async function fetchGitHubRepos(): Promise<GitHubRepoDto[]> {
  const result = await apiService.get<GitHubRepoDto[]>(GITHUB_API);
  if (result.error || !result.data) return [];
  return result.data;
}
