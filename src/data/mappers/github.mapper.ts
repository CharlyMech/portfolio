import type { GitHubRepoDTO } from '@/data/dtos/github.dto';
import type { GitHubRepoDomain } from '@/data/models/github.model';

export function mapRepoToDomain(dto: GitHubRepoDTO): GitHubRepoDomain {
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
