import type { GitHubRepoDto } from '@/core/dtos/githubDto';
import type { GitHubRepoDomain } from '@/core/models/github';

export function mapRepoToDomain(dto: GitHubRepoDto): GitHubRepoDomain {
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
