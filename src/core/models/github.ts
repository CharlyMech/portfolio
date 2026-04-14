export interface GitHubRepoDomain {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  topics: string[];
  updatedAt: Date;
}
